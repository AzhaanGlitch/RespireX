from rest_framework import authentication, exceptions
from supabase import create_client, Client
from django.conf import settings
from django.contrib.auth.models import User
from .models import UserProfile

# 1. DRF Authentication Class (Keep this, it's good practice)
class SupabaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            token = auth_header.split(' ')[1]
            supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            
            user_data = supabase.auth.get_user(token)
            if not user_data:
                raise exceptions.AuthenticationFailed('Invalid token')
            
            uid = user_data.user.id
            email = user_data.user.email

            user, created = User.objects.get_or_create(username=uid, defaults={'email': email})
            return (user, None)
            
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')

# 2. MISSING FUNCTIONS (Add these to fix the ImportError)

def authenticate_user(email, password):
    """
    Logs in the user via Supabase and returns the access token.
    Used by the 'login' view.
    """
    supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    try:
        response = supabase.auth.sign_in_with_password({
            "email": email, 
            "password": password
        })
        # Return the access token string
        return response.session.access_token
    except Exception as e:
        print(f"❌ Login failed: {e}")
        return None

def get_user_from_token(request):
    """
    Manually extracts the user from the request headers.
    Used by 'patient_dashboard' and 'upload_xray'.
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
        
    try:
        token = auth_header.split(' ')[1]
        supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        
        user_data = supabase.auth.get_user(token)
        if not user_data:
            return None
            
        # Sync with Django User model (required for Foreign Keys in TestResult)
        uid = user_data.user.id
        email = user_data.user.email
        user, _ = User.objects.get_or_create(username=uid, defaults={'email': email})
        
        return user
    except Exception as e:
        print(f"❌ Token extraction failed: {e}")
        return None