from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        
        data = super().validate(attrs)
        first_group = self.user.groups.first()
        group_name = first_group.name if first_group else ''
        data.update(
            {'usuario': self.user.first_name + " " + self.user.last_name,
             'rol':group_name
             })
        return data
