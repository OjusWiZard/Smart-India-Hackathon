from django.http.response import HttpResponseBadRequest
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
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        if self.action == 'update' or self.action == 'partial_update':
            return self.queryset.filter(user=self.request.user)
        return self.queryset
    
    def create(self, request, *args, **kwargs):
        if not request.data.get('scholarship'):
            return HttpResponseBadRequest('Scholarship is required')
        scholarship = Scholarship.objects.get(pk=request.data.get('scholarship'))
        if scholarship.max_claims < scholarship.applications.filter(status='Approved').count():
            return HttpResponseBadRequest('No more applications allowed')
        return super().create(request, *args, **kwargs)


class EligibilityViewSet(ReadOnlyModelViewSet):
    queryset = Eligibility.objects.all()
    serializer_class = EligibilitySerializer
    lookup_field = 'application'

    def list(self, request, *args, **kwargs):
        return HttpResponseBadRequest()
    
    def retrieve(self, request, *args, **kwargs):
        application = self.get_object()
        eligibility_checks = application.scholarship.attribute_checks

        eligibilities = []
        for eligibility_check in eligibility_checks:
            if Eligibility.objects.filter(application=application, eligibility_check=eligibility_check).exists():
                eligibility = Eligibility.objects.get(application=application, eligibility_check=eligibility_check)
                eligibilities.append(eligibility)
            else:
                eligibility = Eligibility(application=application, eligibility_check=eligibility_check)
                eligibility.passed = check_eligibility(application, eligibility_check)
                eligibility.save()
                eligibilities.append(eligibility)
        
        serializer = self.get_serializer(eligibilities, many=True)
        return Response(serializer.data)