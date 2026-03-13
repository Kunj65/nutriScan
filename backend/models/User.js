const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  predictionHistory: [{
    date: { type: Date, default: Date.now },
    prediction: String,
    confidence: Number,
    nutrition: {
      calories: { type: mongoose.Schema.Types.Mixed },
      protein: { type: mongoose.Schema.Types.Mixed },
      carbs: { type: mongoose.Schema.Types.Mixed },
      fat: { type: mongoose.Schema.Types.Mixed }
    }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);