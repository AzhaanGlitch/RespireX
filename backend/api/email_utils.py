import os
import base64
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (
    Mail, Attachment, FileContent, FileName, FileType, Disposition
)
from django.conf import settings

# --- CONFIGURATION ---
# 1. HARDCODE YOUR KEY HERE FOR TESTING (Remove before deploying to GitHub)
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY') # <--- PASTE YOUR KEY HERE inside quotes
SENDER_EMAIL = "gamingyash54@gmail.com"  # <--- MUST match the Single Sender you verified
# ---------------------

def send_html_email(subject, recipient_list, html_content, pdf_buffer=None, filename="Report.pdf"):
    """
    Sends an email using SendGrid API (Bypasses Gmail SMTP).
    """
    # 1. Create the email object
    message = Mail(
        from_email=SENDER_EMAIL,
        to_emails=recipient_list,
        subject=subject,
        html_content=html_content
    )

    # 2. Attach the PDF if it exists
    if pdf_buffer:
        # SendGrid requires the file to be encoded in Base64 string
        encoded_file = base64.b64encode(pdf_buffer.getvalue()).decode()
        
        attachment = Attachment(
            FileContent(encoded_file),
            FileName(filename),
            FileType('application/pdf'),
            Disposition('attachment')
        )
        message.attachment = attachment

    # 3. Send via API
    try:
        print(f"🚀 Sending email via SendGrid to {recipient_list}...")
        
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        print(f"✅ SendGrid Status: {response.status_code}")
        
        if response.status_code in [200, 201, 202]:
            print("SUCCESS: Email sent!")
        else:
            print(f"WARNING: Unexpected status code {response.status_code}")
            
    except Exception as e:
        print(f"❌ SendGrid Failed: {str(e)}")
        if hasattr(e, 'body'):
            print(f"Error Body: {e.body}")
        raise e # Re-raise to alert the frontend

def get_medical_email_template(patient_name, test_date, risk_level, confidence):
    """
    Returns the HTML email body.
    """
    # Define colors
    if risk_level in ["High", "Medium"]:
        color = "#e11d48" # Red
        icon = "⚠️"
    else:
        color = "#059669" # Green
        icon = "✅"
        
    dashboard_link = "https://respirex.vercel.app" # Change to your Vercel URL later

    return f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center;">
            <h2 style="margin:0;">RespireX Report</h2>
        </div>
        <div style="padding: 30px;">
            <h3>Hello {patient_name},</h3>
            <p>Your analysis from {test_date} is complete.</p>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p><strong>Result:</strong> <span style="color: {color}; font-weight: bold;">{icon} {risk_level} Risk</span></p>
                <p><strong>AI Confidence:</strong> {confidence}%</p>
            </div>
            
            <p>Please find the detailed PDF report attached.</p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="{dashboard_link}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Dashboard</a>
            </div>
        </div>
    </div>
    """