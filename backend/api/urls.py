from django.urls import path
from . import views

urlpatterns = [
    # ─── Auth ───
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.login, name='login'),

    # ─── Patient ───
    path('api/patient/dashboard/', views.patient_dashboard, name='patient-dashboard'),
    path('api/patient/upload-xray/', views.upload_xray, name='upload-xray'),
    path('api/patient/symptom-test/', views.symptom_test, name='symptom-test'),

    # ─── Doctor (Direct Access — no auth in prototype) ───
    path('api/doctor/dashboard/', views.doctor_dashboard, name='doctor-dashboard'),

    # ─── REMOVED for prototype ───
    # path('api/report/...', ...)   ← all report/PDF routes removed
]