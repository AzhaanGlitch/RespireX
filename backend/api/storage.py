from supabase import create_client
from django.conf import settings
import uuid

def upload_to_supabase(image_file):
    supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    filename = f"{uuid.uuid4()}.{image_file.name.split('.')[-1]}"
    file_content = image_file.read()
    
    supabase.storage.from_("xrays").upload(
        file=file_content,
        path=filename,
        file_options={"content-type": image_file.content_type}
    )
    return supabase.storage.from_("xrays").get_public_url(filename)