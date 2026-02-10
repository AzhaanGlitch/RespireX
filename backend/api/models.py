from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = (('patient', 'Patient'), ('doctor', 'Doctor'))
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    
    # Common fields
    # --- NEW FIELDS ADDED HERE ---
    full_name = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    # -----------------------------
    
    state = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    
    # Doctor specific
    license_number = models.CharField(max_length=50, blank=True, null=True)
    
    # Patient specific
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class TestResult(models.Model):
    RESULT_CHOICES = (('Positive', 'Positive'), ('Negative', 'Negative'))
    RISK_CHOICES = (('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low'))
    
    patient = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='test_results')
    xray_image_url = models.URLField()
    date_tested = models.DateTimeField(auto_now_add=True)
    
    # Prediction Data
    result = models.CharField(max_length=20, choices=RESULT_CHOICES)
    confidence_score = models.FloatField()
    risk_level = models.CharField(max_length=20, choices=RISK_CHOICES)
    
    # Storing symptoms as a JSON object for flexibility
    symptoms_data = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.patient.user.username} - {self.result} ({self.date_tested})"