# flask_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from PIL import Image
import io
import base64
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
MODEL_PATH = 'final_food_model_mobilenet.h5'
IMG_SIZE = (224, 224)

# Define class labels (update with your actual classes)
class_labels = [
    'burger', 'butter_naan', 'chai', 'chapati', 'chole_bhature', 'dal_makhani', 
    'dhokla', 'fried_rice', 'idli', 'jalebi', 'kaathi_rolls', 'kadai_paneer', 
    'kulfi', 'masala_dosa', 'momos', 'paani_puri', 'pakode', 'pav_bhaji', 
    'pizza', 'samosa'
]

def create_model_architecture(num_classes):
    """Recreate the exact model architecture"""
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224,224,3))
    base_model.trainable = False
    
    x = GlobalAveragePooling2D()(base_model.output)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.4)(x)
    output = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=output)
    return model

def load_model_with_fallback():
    """Load model with multiple fallback strategies"""
    global model
    
    # Strategy 1: Try loading directly
    try:
        model = load_model(MODEL_PATH)
        logger.info("Model loaded successfully with direct loading!")
        return model
    except Exception as e:
        logger.warning(f"Direct loading failed: {e}")
    
    # Strategy 2: Load with compile=False
    try:
        model = load_model(MODEL_PATH, compile=False)
        # Recompile the model
        model.compile(
            optimizer=Adam(learning_rate=0.0001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        logger.info("Model loaded successfully with compile=False!")
        return model
    except Exception as e:
        logger.warning(f"Loading with compile=False failed: {e}")
    
    # Strategy 3: Load weights only
    try:
        # Recreate model architecture
        model = create_model_architecture(len(class_labels))
        model.compile(
            optimizer=Adam(learning_rate=0.0001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        # Load weights
        model.load_weights(MODEL_PATH)
        logger.info("Model weights loaded successfully!")
        return model
    except Exception as e:
        logger.warning(f"Loading weights failed: {e}")
    
    # Strategy 4: Use custom objects
    try:
        custom_objects = {
            'relu': tf.nn.relu,
            'softmax': tf.nn.softmax
        }
        model = load_model(MODEL_PATH, custom_objects=custom_objects)
        logger.info("Model loaded with custom objects!")
        return model
    except Exception as e:
        logger.error(f"All loading strategies failed: {e}")
        return None

# Load model at startup
model = load_model_with_fallback()

# Nutrition database
nutrition_data = {
    "burger": {"calories": 295, "protein": 17, "carbs": 30, "fat": 14},
    "butter_naan": {"calories": 310, "protein": 9, "carbs": 50, "fat": 10},
    "chai": {"calories": 120, "protein": 4, "carbs": 12, "fat": 5},
    "chapati": {"calories": 104, "protein": 3, "carbs": 15, "fat": 3},
    "chole_bhature": {"calories": 427, "protein": 12, "carbs": 45, "fat": 20},
    "dal_makhani": {"calories": 230, "protein": 9, "carbs": 25, "fat": 10},
    "dhokla": {"calories": 160, "protein": 7, "carbs": 22, "fat": 6},
    "fried_rice": {"calories": 250, "protein": 5, "carbs": 40, "fat": 8},
    "idli": {"calories": 58, "protein": 2, "carbs": 12, "fat": 0.4},
    "jalebi": {"calories": 310, "protein": 2, "carbs": 70, "fat": 5},
    "kaathi_rolls": {"calories": 380, "protein": 10, "carbs": 45, "fat": 18},
    "kadai_paneer": {"calories": 320, "protein": 12, "carbs": 15, "fat": 25},
    "kulfi": {"calories": 270, "protein": 8, "carbs": 30, "fat": 12},
    "masala_dosa": {"calories": 165, "protein": 4, "carbs": 30, "fat": 4},
    "momos": {"calories": 45, "protein": 2, "carbs": 6, "fat": 1},
    "paani_puri": {"calories": 329, "protein": 4, "carbs": 56, "fat": 10},
    "pakode": {"calories": 315, "protein": 9, "carbs": 30, "fat": 20},
    "pav_bhaji": {"calories": 400, "protein": 9, "carbs": 50, "fat": 18},
    "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fat": 10},
    "samosa": {"calories": 262, "protein": 4, "carbs": 31, "fat": 13}
}

def preprocess_image(img_bytes):
    """Preprocess image for model prediction"""
    try:
        img = Image.open(io.BytesIO(img_bytes))
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        # Resize image
        img = img.resize(IMG_SIZE)
        # Convert to array and normalize
        img_array = image.img_to_array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'tensorflow_version': tf.__version__
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Main prediction endpoint"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Get image from request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Read and preprocess image
        img_bytes = file.read()
        processed_img = preprocess_image(img_bytes)
        
        # Make prediction
        predictions = model.predict(processed_img, verbose=0)  # Set verbose=0 to reduce output
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get predicted class name
        predicted_class = class_labels[predicted_class_idx] if predicted_class_idx < len(class_labels) else 'unknown'
        
        # Get nutrition info
        nutrition = nutrition_data.get(predicted_class.lower(), {
            'calories': 'N/A',
            'protein': 'N/A',
            'carbs': 'N/A',
            'fat': 'N/A'
        })
        
        # Prepare response
        response = {
            'success': True,
            'prediction': predicted_class,
            'confidence': round(confidence * 100, 2),
            'nutrition': nutrition,
            'top_3': []
        }
        
        # Get top 3 predictions
        top_3_idx = np.argsort(predictions[0])[-3:][::-1]
        for idx in top_3_idx:
            if idx < len(class_labels):
                response['top_3'].append({
                    'class': class_labels[idx],
                    'confidence': round(float(predictions[0][idx]) * 100, 2)
                })
        
        logger.info(f"Prediction: {predicted_class} with {confidence*100:.2f}% confidence")
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict_base64', methods=['POST'])
def predict_base64():
    """Alternative endpoint for base64 encoded images"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        img_data = base64.b64decode(data['image'].split(',')[1] if ',' in data['image'] else data['image'])
        
        # Preprocess and predict
        processed_img = preprocess_image(img_data)
        predictions = model.predict(processed_img, verbose=0)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        predicted_class = class_labels[predicted_class_idx] if predicted_class_idx < len(class_labels) else 'unknown'
        
        return jsonify({
            'success': True,
            'prediction': predicted_class,
            'confidence': round(confidence * 100, 2)
        })
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/classes', methods=['GET'])
def get_classes():
    """Get available food classes"""
    return jsonify({
        'classes': class_labels,
        'total_classes': len(class_labels)
    })

if __name__ == '__main__':
    print(f"TensorFlow version: {tf.__version__}")
    print(f"Model loaded: {model is not None}")
    print(f"Available classes: {len(class_labels)}")
    app.run(host='0.0.0.0', port=5000, debug=True)