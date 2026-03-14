import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, AlertCircle, Info, TrendingUp, Apple } from 'lucide-react';
import Navbar from './NavMenu';
import Footer from './FooterMain';

const FoodRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const API_URL =
    
    'http://localhost:5000';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedImage(file);
    setError(null);
    setPrediction(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);
    
    // Add userId if user is logged in (get from your auth context/state)
    const userId = localStorage.getItem('userId');
    if (userId) {
      formData.append('userId', userId);
    }

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setPrediction(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.log('Prediction error:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPrediction(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFoodName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

    // Test server connection
  const testConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      console.log('Server status:', data);
      if (data.model_loaded) {
        setError(null);
        alert('✅ Server is running and model is loaded!');
      } else {
        setError('Server is running but model failed to load');
      }
    } catch (err) {
      alert('Cannot connect to server. Make sure Flask app is running.');
    }
  };


  return (

    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Food Recognition & Nutrition Analysis
          </h1>
          <p className="text-gray-600 text-lg">
            Upload a food image to identify it and get nutritional information
          </p>
        

        {/* Test Connection Button */}
           <button
             onClick={testConnection}
             className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
           >
             Test Server Connection
           </button>
         </div>


        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Camera className="text-blue-500" />
              Upload Image
            </h2>

            {/* Drop Zone */}
            <div
              className={`border-3 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-64 object-contain mx-auto rounded-lg shadow-md"
                  />
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handlePredict}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <TrendingUp size={20} />
                          Analyze Food
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drag and drop your image here, or
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Browse Files
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supported formats: JPG, PNG, JPEG (Max 10MB)
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Apple className="text-green-500" />
              Results
            </h2>

            {prediction ? (
              <div className="space-y-6">
                {/* Main Prediction */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Detected Food</h3>
                  <p className="text-3xl font-bold text-gray-800 mb-2">
                    {formatFoodName(prediction.prediction)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {prediction.confidence}%
                    </span>
                  </div>
                </div>

                {/* Nutrition Information */}
                {prediction.nutrition && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Nutritional Information (per serving)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Calories</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {prediction.nutrition.calories || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Protein</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {prediction.nutrition.protein || 'N/A'}g
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Carbs</p>
                        <p className="text-2xl font-bold text-green-600">
                          {prediction.nutrition.carbs || 'N/A'}g
                        </p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Fat</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {prediction.nutrition.fat || 'N/A'}g
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top 3 Predictions */}
                {prediction.top_3 && prediction.top_3.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Alternative Predictions
                    </h3>
                    <div className="space-y-2">
                      {prediction.top_3.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <span className="text-gray-700">
                            {index + 1}. {formatFoodName(item.class)}
                          </span>
                          <span className="text-sm font-semibold text-gray-500">
                            {item.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Info className="text-gray-400" size={40} />
                </div>
                <p className="text-gray-500 text-lg">
                  Upload an image to see results
                </p>
                
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Tips for Best Results
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Use clear, well-lit images with the food as the main subject</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Avoid blurry or dark photos for better accuracy</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Single food items work better than mixed dishes</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default FoodRecognition;
