from django.contrib import admin
from .models import Logic, Scholarship, EligibilityCheck, Application, Eligibility


class ScholarshipAdmin(admin.ModelAdmin):
    list_display = ['name', 'amount', 'max_claims', 'starting']
    search_fields = ['name', 'description']
    ordering = ['starting',]


class EligibilityCheckAdmin(admin.ModelAdmin):
    list_display = ['scholarship', 'attribute', 'logic', 'edge_value', 'edge_option']
    search_fields = ['scholarship', 'attribute']
    list_filter = ['scholarship']
    ordering = ['scholarship', 'attribute', 'logic']


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['scholarship', 'user', 'status', 'created_at', 'updated_at']
    search_fields = ['scholarship', 'user']
    list_filter = ['scholarship']
    ordering = ['-updated_at']


class EligibilityAdmin(admin.ModelAdmin):
    list_display = ['application', 'eligibility_check', 'passed']
    search_fields = ['application', 'eligibility_check']
    list_filter = ['application']
    ordering = ['-application']


admin.site.register(Logic)
admin.site.register(Scholarship, ScholarshipAdmin)
admin.site.register(EligibilityCheck, EligibilityCheckAdmin)    
admin.site.register(Application, ApplicationAdmin)
admin.site.register(Eligibility, EligibilityAdmin)
