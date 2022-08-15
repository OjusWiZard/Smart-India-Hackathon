from rest_framework.serializers import ModelSerializer, SerializerMethodField
from documents.serializers import AttributeSerializer, OptionSerializer
from .models import Scholarship, EligibilityCheck, Eligibility, Application, Attribute, Option, Logic


class LogicSerializer(ModelSerializer):
    class Meta:
        model = Logic
        fields = '__all__'


class EligibilityCheckSerializer(ModelSerializer):
    class Meta:
        model = EligibilityCheck
        fields = ['attribute', 'logic', 'edge_option', 'edge_value']


class EligibilityCheckDetailSerializer(ModelSerializer):
    attribute = AttributeSerializer()
    logic = LogicSerializer()
    edge_option = OptionSerializer()
    class Meta:
        model = EligibilityCheck
        fields = ['attribute', 'logic', 'edge_option', 'edge_value']


class ScholarshipSerializer(ModelSerializer):
    attribute_checks = EligibilityCheckSerializer(many=True)
    class Meta:
        model = Scholarship
        fields = ['name', 'description', 'amount', 'no_of_claims', 'starting', 'duration', 'attribute_checks']


class ScholarshipListSerializer(ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['name', 'amount', 'no_of_claims', 'starting', 'duration']


class ScholarshipDetailSerializer(ModelSerializer):
    attribute_checks = EligibilityCheckSerializer(many=True)
    class Meta:
        model = Scholarship
        fields = ['name', 'description', 'amount', 'no_of_claims', 'starting', 'duration', 'attribute_checks']


class EligibilitySerializer(ModelSerializer):
    eligibility_checks = EligibilityCheckDetailSerializer()
    class Meta:
        model = Eligibility
        fields = ['eligibility_check', 'passed']


class ApplicationSerializer(ModelSerializer):
    eligibilities = EligibilitySerializer(many=True)
    scholarship = ScholarshipListSerializer()
    class Meta:
        model = Application
        fields = ['status', 'created_at', 'updated_at', 'user', 'scholarship', 'eligibilities']