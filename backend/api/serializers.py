from rest_framework import serializers
from .models import UserProfile, TestResult
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = UserProfile
        # Add the new fields to the serializer
        fields = ['id', 'email', 'full_name', 'phone', 'address', 'role', 'state', 'city', 'age', 'gender', 'license_number']

class TestResultSerializer(serializers.ModelSerializer):
    # Use full_name if available, otherwise fallback to email
    patient_name = serializers.SerializerMethodField()
    
    # Fetch extra patient details
    email = serializers.CharField(source='patient.user.email', read_only=True) 
    
    state = serializers.CharField(source='patient.state', read_only=True)
    city = serializers.CharField(source='patient.city', read_only=True)
    age = serializers.IntegerField(source='patient.age', read_only=True)
    gender = serializers.CharField(source='patient.gender', read_only=True)
    phone = serializers.CharField(source='patient.phone', read_only=True)

    # OVERRIDE the model field to dynamically calculate risk level for ALL records (old and new)
    risk_level = serializers.SerializerMethodField()

    class Meta:
        model = TestResult
        fields = '__all__'
        
    def get_patient_name(self, obj):
        # Return full_name if it exists, else return email
        if obj.patient.full_name:
            return obj.patient.full_name
        return obj.patient.user.email

    def get_risk_level(self, obj):
        """
        Dynamically calculates Risk Level based on Confidence Score.
        This ensures 'Medium' is returned for 50-80% even if the DB says 'Low'.
        """
        if obj.result == 'Negative':
            return 'Low'
        
        # Positive Case Logic
        # obj.confidence_score is stored as 0-100 float
        if obj.confidence_score > 80:
            return 'High'
        elif obj.confidence_score >= 50:
            return 'Medium'
        else:
            return 'Low'