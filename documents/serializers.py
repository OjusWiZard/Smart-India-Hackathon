from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Document, Attribute, Option, Value, DocumentOwnership


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class AttributeSerializer(ModelSerializer):
    options = SerializerMethodField('get_options')

    def get_options(self, obj):
        return OptionSerializer(obj.option_set.all(), many=True).data

    class Meta:
        model = Attribute
        fields = ['id', 'name', '_type', 'options']


class ValueSerializer(ModelSerializer):
    attribute = SerializerMethodField('get_attribute')
    option = SerializerMethodField('get_option')

    def get_attribute(self, obj):
        return obj.attribute.name

    def get_option(self, obj):
        return obj.option.name if obj.option else None

    class Meta:
        model = Value
        fields = ['attribute', 'option', 'value']


class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = ['name']


class DocumentOwnershipSerializer(ModelSerializer):
    document = SerializerMethodField('get_document')
    values = SerializerMethodField('get_values')

    def get_document(self, obj):
        return DocumentSerializer(obj.document).data

    def get_values(self, obj):
        return ValueSerializer(obj.values.all(), many=True).data

    class Meta:
        model = DocumentOwnership
        fields = ['document', 'values']
