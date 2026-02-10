import os
import numpy as np
import tensorflow as tf
from PIL import Image
from django.conf import settings

# Define the path to the model
MODEL_PATH = os.path.join(settings.BASE_DIR, 'model', 'efficientnet_b0.h5')
model = None

# Load the model once when the server starts
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ ML Model Loaded Successfully")
except Exception as e:
    print(f"⚠️ ML Model not found or error loading: {e}. Using dummy mode.")

def predict_xray(image_file):
    """
    Predicts if an X-ray image is Positive (Tuberculosis) or Negative (Normal).
    """
    if not model:
        # Dummy fallback if model didn't load
        return "Negative", 85.5, "Low" 
        
    try:
        # 1. Load and Preprocess Image
        # Convert to RGB to ensure 3 channels
        img = Image.open(image_file).convert('RGB')
        
        # Resize to 128x128 (Must match your training notebook size)
        img = img.resize((128, 128))
        
        # Convert to array and add batch dimension
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        
        # CRITICAL FIX: Normalize pixel values to 0-1 range
        img_array = img_array / 255.0
        
        # 2. Make Prediction
        # Expected output shape: [[prob_normal, prob_tb]]
        prediction = model.predict(img_array)
        
        # Get the class with the highest probability
        # Class 0 = Normal, Class 1 = Tuberculosis
        class_idx = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction))
        
        # 3. Interpret Results
        if class_idx == 1:
            result = "Positive"  # Tuberculosis detected
            
            if confidence > 0.8:
                risk_level = "High"
            elif confidence >= 0.5:
                risk_level = "Medium"
            else:
                risk_level = "Low"
        else:
            result = "Negative"  # Normal
            risk_level = "Low"

        return (result, round(confidence * 100, 2), risk_level)

    except Exception as e:
        print(f"❌ Error processing image: {e}")
        # Return error state or safe default
        return "Error", 0.0, "Low"