from django.contrib import admin
from .models import UserProfile, TestResult

# Register the UserProfile model so you can change roles
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    # Columns to show in the list
    list_display = ('user', 'email_display', 'role', 'full_name', 'phone')
    # Filters on the right sidebar
    list_filter = ('role', 'state')
    # Search box functionality
    search_fields = ('user__username', 'user__email', 'full_name')

    # Helper to show email from the related User model
    def email_display(self, obj):
        return obj.user.email
    email_display.short_description = 'Email'

# Register the TestResult model to see patient scans
@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ('patient', 'result', 'confidence_score', 'date_tested')
    list_filter = ('result', 'risk_level', 'date_tested')