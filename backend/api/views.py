from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile, TestResult
from .serializers import UserProfileSerializer, TestResultSerializer
from .ml_engine import predict
from .email_utils import send_test_result_email
from .authentication import authenticate_user, get_user_from_token
# pdf_generator import REMOVED for prototype

import os
import uuid
from datetime import datetime


# ─── AUTH ENDPOINTS ─────────────────────────────────────────────

@api_view(['POST'])
def signup(request):
    """Patient / Doctor signup"""
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Signup successful", "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """Patient login (Doctor gets direct access — no login needed)"""
    email = request.data.get('email')
    password = request.data.get('password')

    token = authenticate_user(email, password)
    if token:
        return Response({"token": token, "message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# ─── PATIENT ENDPOINTS ──────────────────────────────────────────

@api_view(['GET'])
def patient_dashboard(request):
    """Patient home — returns their latest test result (if any)"""
    user = get_user_from_token(request)
    if not user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    latest = TestResult.objects.filter(patient=user).order_by('-created_at').first()
    if latest:
        return Response(TestResultSerializer(latest).data)
    return Response({"message": "No tests yet"})


@api_view(['POST'], )
@parser_classes([MultiPartParser])
def upload_xray(request):
    """Receive chest X-ray image, run ML prediction, save result"""
    user = get_user_from_token(request)
    if not user:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    image = request.FILES.get('xray')
    if not image:
        return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Save image
    filename = f"{uuid.uuid4()}_{image.name}"
    upload_path = os.path.join('uploads', filename)
    with open(upload_path, 'wb') as f:
        for chunk in image.chunks():
            f.write(chunk)

    # ML prediction
    prediction = predict(upload_path)  # returns dict like { "label": "Normal", "confidence": 0.92 }

    # Save test result
    result = TestResult.objects.create(
        patient=user,
        image_path=upload_path,
        label=prediction['label'],
        confidence=prediction['confidence'],
    )

    # Optionally send email (no PDF attachment in prototype)
    try:
        send_test_result_email(user.email, prediction)
    except Exception:
        pass  # non-blocking

    return Response({
        "id": result.id,
        "label": prediction['label'],
        "confidence": prediction['confidence'],
        "created_at": result.created_at.isoformat(),
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def symptom_test(request):
    """Simple symptom quiz — returns a basic risk score"""
    answers = request.data.get('answers', [])
    # Lightweight scoring (no ML model needed)
    score = sum(answers)  # assumes 0/1 answers
    total = len(answers) if answers else 1

    if score / total >= 0.6:
        risk = "High"
    elif score / total >= 0.3:
        risk = "Moderate"
    else:
        risk = "Low"

    return Response({"risk_level": risk, "score": score, "total": total})


# ─── DOCTOR ENDPOINTS (Direct Access — no auth required for prototype) ───

@api_view(['GET'])
def doctor_dashboard(request):
    """
    Doctor direct-access endpoint.
    Returns dummy test data for prototype.
    No authentication required.
    """
    dummy_tests = [
        {
            "id": 1,
            "test_name": "Test 1",
            "patient_name": "Rahul Sharma",
            "patient_email": "rahul.sharma@email.com",
            "label": "Pneumonia",
            "confidence": 0.87,
            "date": "2026-01-28",
            "status": "Pending Review",
        },
        {
            "id": 2,
            "test_name": "Test 2",
            "patient_name": "Priya Mehta",
            "patient_email": "priya.mehta@email.com",
            "label": "Normal",
            "confidence": 0.94,
            "date": "2026-01-30",
            "status": "Pending Review",
        },
    ]
    return Response({"tests": dummy_tests}, status=status.HTTP_200_OK)


# ─── REPORT GENERATION — REMOVED FOR PROTOTYPE ─────────────────
# All /api/report/* endpoints and pdf_generator usage have been removed.
# In the full version, this section handled PDF generation via pdf_generator.py.