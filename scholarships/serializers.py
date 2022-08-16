from rest_framework.serializers import ModelSerializer, SerializerMethodField
from documents.serializers import AttributeSerializer, OptionSerializer
from accounts.serializers import UserSerializer
from .models import Scholarship, EligibilityCheck, Eligibility, Application, Logic


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


class ScholarshipListSerializer(ModelSerializer):
    created_by = UserSerializer()
    class Meta:
        model = Scholarship
        fields = ['id', 'name', 'amount', 'max_claims', 'starting', 'created_by']


class ScholarshipDetailSerializer(ModelSerializer):
    attribute_checks = SerializerMethodField('get_attribute_checks')

    def get_attribute_checks(self, obj):
        attribute_checks = EligibilityCheck.objects.filter(scholarship=obj)
        return EligibilityCheckDetailSerializer(attribute_checks, many=True).data

    class Meta:
        model = Scholarship
        fields = ['id', 'name', 'description', 'amount', 'max_claims', 'starting', 'created_by', 'attribute_checks']


class ScholarshipCreateSerializer(ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['id', 'name', 'description', 'amount', 'max_claims', 'starting', 'created_by']


class EligibilitySerializer(ModelSerializer):
    eligibility_check = EligibilityCheckDetailSerializer()
    class Meta:
        model = Eligibility
        fields = ['eligibility_check', 'passed']


class ApplicationSerializer(ModelSerializer):
    eligibilities = EligibilitySerializer(many=True)
    scholarship = ScholarshipListSerializer()
    class Meta:
        model = Application
        fields = ['status', 'created_at', 'updated_at', 'user', 'scholarship', 'eligibilities']