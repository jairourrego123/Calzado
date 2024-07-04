from rest_framework import serializers
from .models import Producto
from ApiBackendApp.serializers import BaseSerializer

class ProductoSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Producto
       
