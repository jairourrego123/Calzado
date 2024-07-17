# your_project/utils/mixins.py

from django import forms
from django.contrib import admin

class TenantAdminMixin:
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(tenant=request.user.tenant)

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            if 'tenant' in form.base_fields:
                # form.base_fields['tenant'].disabled = True
                form.base_fields['tenant'].widget = forms.HiddenInput()
        return form

    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser:
            obj.tenant = request.user.tenant
        super().save_model(request, obj, form, change)

    def get_list_display(self, request):
        list_display = super().get_list_display(request)
        if not request.user.is_superuser:
                list_display = list(filter(lambda x: x != 'tenant', list_display))
        return list_display
    
    def get_search_fields(self, request):
        search_fields = super().get_search_fields(request)

        if not request.user.is_superuser:
                search_fields = list(filter(lambda x: x != 'tenant', search_fields))

        return search_fields


    def get_list_filter(self, request):
        list_filter = super().get_list_filter(request)
        
        if not request.user.is_superuser:
                list_filter = list(filter(lambda x: x != 'tenant', list_filter))

        return list_filter
