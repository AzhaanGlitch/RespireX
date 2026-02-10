from rest_framework import authentication, exceptions
from supabase import create_client, Client
from django.conf import settings
from django.contrib.auth.models import User
from .models import UserProfile

class SupabaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # 1. Check if Header exists
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            print("❌ DEBUG: No Authorization header found")
            return None

        try:
            # 2. Extract Token
            token = auth_header.split(' ')[1]
            # print(f"❌ DEBUG: Token received: {token[:10]}...") # Uncomment to see partial token

            # 3. Connect to Supabase
            supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            
            # 4. Verify User
            print("⏳ DEBUG: Verifying token with Supabase...")
            user_data = supabase.auth.get_user(token)
            
            if not user_data:
                print("❌ DEBUG: Supabase returned no user data")
                raise exceptions.AuthenticationFailed('Invalid token')
            
            # 5. Get User Details
            uid = user_data.user.id
            email = user_data.user.email
            print(f"✅ DEBUG: Supabase User Found: {email} ({uid})")

            # 6. Get or Create Django User
            user, created = User.objects.get_or_create(username=uid, defaults={'email': email})
            if created:
                print("✅ DEBUG: New Django User Created")
            else:
                print("✅ DEBUG: Existing Django User Found")
                
            return (user, None)
            
        except Exception as e:
            print(f"❌ DEBUG: Auth Error: {str(e)}")
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')