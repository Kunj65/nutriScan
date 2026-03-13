// server.js - Updated with ML integration
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

// Import User model
const User = require("./models/User");

// Flask API URL (update this based on your deployment)
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Prana_Flow";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Existing helper functions
const totalCount = async () => {
  try {
    const totalCount = await User.countDocuments();
    return totalCount;
  } catch (err) {
    console.error("Error counting total documents in database!: ", err);
    return 0;
  }
};

const fetchUser = async (doc_num) => {
  try {
    const users = await User.find();
    return users[doc_num]?.email;
  } catch (err) {
    console.error('Error fetching users:', err);
    return null;
  }
};

const findUser = async (email) => {
  try {
    const count = await totalCount();
    for (let i = 0; i < count; i++) {
      if (email == await fetchUser(i)) {
        return email;
      }
    }
    return null;
  } catch (err) {
    console.error("Getting an error: ", err);
    return null;
  }
};

// ===============================
// ML MODEL ENDPOINTS
// ===============================

// Health check for ML service
app.get("/api/ml/health", async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API_URL}/health`);
    res.json(response.data);
  } catch (error) {
    console.error("ML service health check failed:", error.message);
    res.status(503).json({
      error: "ML service unavailable",
      details: error.message
    });
  }
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Node backend is working" });
});

// Predict food from image upload
app.post("/api/predict", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Create form data to send to Flask
    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Forward request to Flask API
    const response = await axios.post(
      `${FLASK_API_URL}/predict`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    // Optional: Save prediction to user history if user is logged in
    if (req.body.userId) {
      await savePredictionHistory(req.body.userId, response.data);
    }

    res.json(response.data);
  } catch (error) {
    console.error("Prediction error:", error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: "Failed to process image",
        details: error.message
      });
    }
  }
});

// Predict food from base64 image
app.post("/api/predict-base64", async (req, res) => {
  try {
    const { image, userId } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    // Forward request to Flask API
    const response = await axios.post(
      `${FLASK_API_URL}/predict_base64`,
      { image },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Optional: Save to user history
    if (userId) {
      await savePredictionHistory(userId, response.data);
    }

    res.json(response.data);
  } catch (error) {
    console.error("Prediction error:", error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: "Failed to process image",
        details: error.message
      });
    }
  }
});

// Function to save prediction history (optional)
async function savePredictionHistory(userId, predictionData) {
  try {
    // You can extend your User model to include prediction history
    // or create a new PredictionHistory model
    const user = await User.findById(userId);
    if (user) {
      if (!user.predictionHistory) {
        user.predictionHistory = [];
      }
      user.predictionHistory.push({
        date: new Date(),
        prediction: predictionData.prediction,
        confidence: predictionData.confidence,
        nutrition: predictionData.nutrition
      });
      await user.save();
    }
  } catch (error) {
    console.error("Error saving prediction history:", error);
  }
}

// Get user's prediction history
app.get("/api/user/:userId/history", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ history: user.predictionHistory || [] });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// ===============================
// EXISTING AUTH ENDPOINTS
// ===============================

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const DBuser = await findUser(email);
    if (DBuser) {
      res.status(409).json({ message: "Email id already exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        predictionHistory: [] // Initialize prediction history
      });

      await newUser.save();
      res.status(201).json({
        message: "User saved successfully!",
        userId: newUser._id,
        user: { name: newUser.name, email: newUser.email }
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "An error occurred while saving the user." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login successful!",
        userId: user._id,
        user: { name: user.name, email: user.email }
      });
    } else {
      res.status(401).json({ error: "Invalid email or password!" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
});

// Forgot Password
app.post("/forgot-password", async (req, res) => {
  const { email, password, confirm_password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User does not exist!" });
    } else {
      if (password === confirm_password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully!" });
      } else {
        res.status(400).json({ message: "Passwords do not match. Please recheck!" });
      }
    }
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "An error occurred while changing the password!" });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Flask ML API expected at ${FLASK_API_URL}`);
});
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/api/test", (req, res) => {
  res.json({ message: "API test route working" });
});