from requests import request as req
from django.http.response import HttpResponseBadRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from documents.models import Attribute, Option
from .models import EligibilityCheck, Scholarship, Logic, Application, Eligibility
from .serializers import ScholarshipDetailSerializer, ScholarshipListSerializer, ScholarshipCreateSerializer, LogicSerializer, ApplicationSerializer, EligibilitySerializer
from .utils.eligibility import check_eligibility


class LogicViewSet(ReadOnlyModelViewSet):
    queryset = Logic.objects.all()
    serializer_class = LogicSerializer


class ScholarshipViewSet(ModelViewSet):
    queryset = Scholarship.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ScholarshipDetailSerializer
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return ScholarshipCreateSerializer
        return ScholarshipListSerializer

    def get_queryset(self):
        if self.action == 'update' or self.action == 'partial_update':
            return self.queryset.filter(created_by=self.request.user)
        return self.queryset
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get('created_by') == 'me':
            if request.user.is_anonymous:
                return HttpResponseBadRequest('You must be logged in to list your scholarships')
            scholarships = Scholarship.objects.filter(created_by=self.request.user)
            return Response(ScholarshipListSerializer(scholarships, many=True).data)
        return super().list(request, *args, **kwargs)


    def create(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            return HttpResponseBadRequest('You must be logged in to create a scholarship')
        request.data['created_by'] = self.request.user.id
        response = super().create(request, *args, **kwargs)

        try:
            if response.status_code == 201:
                scholarship = Scholarship.objects.get(id=response.data['id'])
                attribute_checks = request.data.get('attribute_checks', [])
                for attribute_check in attribute_checks:
                    attribute = attribute_check.get('attribute', None)
                    logic = attribute_check.get('logic', None)
                    edge_option = attribute_check.get('edge_option', None)
                    edge_value = attribute_check.get('edge_value', None)
                    if attribute and logic and (edge_option or edge_value):
                        EligibilityCheck.objects.create(
                            scholarship=scholarship,
                            attribute=Attribute.objects.get(id=attribute_check['attribute']),
                            logic=Logic.objects.get(id=attribute_check['logic']),
                            edge_option=Option.objects.get(id=attribute_check['edge_option']),
                            edge_value=attribute_check['edge_value']
                        )
                    else:
                        scholarship.delete()
                        return HttpResponseBadRequest('You must provide an attribute, logic, and edge option/value.')
                scholarship.save()
            
            response.data['attribute_checks'] = attribute_checks
        
        except Exception as e:
            print(e)
            scholarship.delete()
            return HttpResponseBadRequest('Error creating scholarship')
        return response
        

class ApplicationViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        if self.action == 'update' or self.action == 'partial_update':
            return self.queryset.filter(user=self.request.user)
        return self.queryset
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get('scholarship'):    
            if not Scholarship.objects.filter(pk=request.query_params.get('scholarship')).exists():
                return HttpResponseBadRequest('scholarship does not exist')
            scholarship = Scholarship.objects.get(pk=request.query_params.get('scholarship'))
            if request.user != scholarship.created_by:
                return HttpResponseBadRequest('You must be the creator of the scholarship to list applications')
            applications = Application.objects.filter(scholarship=scholarship)
            return Response(ApplicationSerializer(applications, many=True).data)
        
        elif request.query_params.get('mine') == 'true':
            applications = Application.objects.filter(user=request.user)
            return Response(ApplicationSerializer(applications, many=True).data)
        
        else:
            return HttpResponseBadRequest('You must provide a scholarship or mine query parameter')
    
    def retrieve(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            return HttpResponseBadRequest('You must be logged in to retrieve an application')
        application = self.get_object()
        if application.scholarship.created_by != request.user and application.user != request.user:
            return HttpResponseBadRequest('You cannot retrieve this application')
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if not request.data.get('scholarship'):
            return HttpResponseBadRequest('scholarship id is required')
        if not Scholarship.objects.filter(pk=request.data.get('scholarship')).exists():
            return HttpResponseBadRequest('scholarship does not exist')
        scholarship = Scholarship.objects.get(pk=request.data.get('scholarship'))
        approved_applications = Application.objects.filter(scholarship=scholarship, status='approved')
        if scholarship.max_claims < approved_applications.count():
            return HttpResponseBadRequest('No more applications allowed')

        application = Application.objects.get_or_create(
            user=request.user,
            scholarship=scholarship
        )[0]

        all_passed = True
        eligibility_checks = EligibilityCheck.objects.filter(scholarship=scholarship)
        for eligibility_check in eligibility_checks:
            eligibility = Eligibility.objects.get_or_create(application=application, eligibility_check=eligibility_check)[0]
            eligibility.passed = check_eligibility(application, eligibility_check)
            if not eligibility.passed:
                all_passed = False
            eligibility.save()
        
        if all_passed:
            application.status = 'Eligible'
            req(
                'POST',
                'http://3.110.67.226:5050/', json={
                'to': application.user.email,
                'subject': 'Successfull Application: ' + application.scholarship.name,
                'body': 'You have successfully applied to ' + application.scholarship.name + '!\nYou are 100 percent ELIGIBLE!!!\n'
            })
        else:
            application.status = 'Ineligible'
        application.save()

        return Response(ApplicationSerializer(application).data)
