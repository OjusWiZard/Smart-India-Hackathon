from django.contrib import admin
from .models import Document, Attribute, Option, Value, DocumentOwnership


class DocumentAdmin(admin.ModelAdmin):
    search_fiels = ['name']
    fields = ['name']


class AttributeAdmin(admin.ModelAdmin):
    search_fiels = ['name']
    list_filter = ['_type']
    list_display= ['name', '_type']


class OptionAdmin(admin.ModelAdmin):
    search_fiels = ['name', 'attribute']
    list_filter = ['attribute']
    list_display= ['name', 'attribute']


class ValueAdmin(admin.ModelAdmin):
    search_fiels = ['value', 'attribute']
    list_filter = ['attribute']
    list_display= ['attribute', 'value', 'option']


class DocumentOwnershipAdmin(admin.ModelAdmin):
    search_fiels = ['document', 'owner']
    list_filter = ['document', 'owner']
    list_display= ['document', 'owner']


admin.site.register(Document, DocumentAdmin)
admin.site.register(Attribute, AttributeAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Value, ValueAdmin)
admin.site.register(DocumentOwnership, DocumentOwnershipAdmin)
