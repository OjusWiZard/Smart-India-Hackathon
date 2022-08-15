from django.http.response import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from .models import Scholarship, Logic, Application, Eligibility
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


class ApplicationViewSet(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        if self.action == 'update' or self.action == 'partial_update':
            return self.queryset.filter(user=self.request.user)
        return self.queryset


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