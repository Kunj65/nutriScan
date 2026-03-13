// express server
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Google Generative AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

// OpenAI - Removed, using Gemini AI instead


// mongodb 
const mongoose = require("mongoose");
const User = require("./models/User");

const bcrypt = require('bcrypt');


// Use CORS middleware
app.use(cors());


// Middleware to parse JSON
app.use(express.json());


// Connect to MongoDB
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

// Initialize Gemini AI (for habit prediction)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Using Gemini AI for both habit prediction and daily planner

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedAdmin();
  })
  .catch((error) => console.error("MongoDB connection error:", error));

const seedAdmin = async () => {
  try {
    const adminEmail = "admin123@gmail.com";
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin@123", 10);
      const adminUser = new User({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });
      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};


// fetching the data from database
const totalCount = async () => {
  try {
    const totalCount = await User.countDocuments();
    return totalCount;
  } catch (err) {
    console.error("Error counting total documents in database!: ", err)
  }
}

const fetchUser = async (doc_num) => {
  try {
    const users = await User.find(); // Fetch all users
    return (users[doc_num].email);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

const findUser = async (email) => {

  try {
    const count = await totalCount()

    for (let i = 0; i < count; i++) {
      if (email == await fetchUser(i)) {
        return email
      }
    }
    return 1;
  } catch (err) {
    console.error("Getting an error: ", err)
  }
}

// Signup Route
app.post("/signup", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const DBuser = await findUser(email)
    if (DBuser != 1) {
      res.status(409).json({ message: "Email id already exist!" });
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10); // hashing the password

      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save()
      res.status(201).json({ message: "User saved successfully!", user: newUser });
    }

  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the user." });
  }
})


// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const DBuser = await findUser(email);
  const databasePassword = await User.findOne({ email: DBuser }, 'password');
  console.log(databasePassword)

  try {
    if (DBuser == 1) {
      console.log("Please enter a valid email id")
      res.status(401).json({ error: "Invalid email" });
    } else {

      if (email === DBuser && bcrypt.compareSync(password, databasePassword.password)) {
        const user = await User.findOne({ email: email });
        res.status(200).json({ message: "Login successful!", role: user.role, user: user });
      } else {
        res.status(401).json({ error: "Invalid email or password!" })
      }
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while Login" });
  }

})

// Change Password
const changePassword = async (email, new_password) => {
  const hashedNewPassword = await bcrypt.hash(new_password, 10); // hashing the password
  const filter = { email: email }
  await User.updateOne(filter, { $set: { password: hashedNewPassword } })
}

// Forgot Password
app.post("/forgot-password", async (req, res) => {
  const { email, password, confirm_password } = req.body;

  try {
    const DBuser = await findUser(email)

    if (DBuser == 1) {
      res.status(409).json({ message: "User is not exist!" });
    } else {
      if (password == confirm_password) {
        const new_password = password
        changePassword(email, new_password)
        res.status(200).json({ message: "Password Change Successfully!" });
      } else {
        res.status(200).json({ message: "Both passwords are not same. Please Recheck!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while changing the Password!" });
  }

})

// Delete Account
app.delete("/delete-account", async (req, res) => {
  const { email } = req.body;
  console.log("Delete account request received for email:", email);

  try {
    const DBuser = await findUser(email);
    console.log("DBuser result:", DBuser);

    if (DBuser == 1) {
      console.log("User not found");
      res.status(404).json({ message: "User not found!" });
    } else {
      const deleteResult = await User.deleteOne({ email: email });
      console.log("Delete result:", deleteResult);
      res.status(200).json({ message: "Account deleted successfully!" });
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "An error occurred while deleting the account." });
  }
});

// Get User Profile
app.get("/user-profile", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email: email }, '-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Get all users (for Admin Panel)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Predict Habits using AI
app.post("/predict-habits", async (req, res) => {
  const { query } = req.body;

  try {
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    const prompt = `You are a helpful AI assistant that provides personalized habit recommendations. 
Based on the user's goal or challenge: "${query}", suggest 5 specific, actionable habits that will help them achieve their goal.

Format your response as a JSON array of strings, where each string is a concise habit recommendation (max 60 characters).
Example format: ["Habit 1", "Habit 2", "Habit 3", "Habit 4", "Habit 5"]

Only return the JSON array, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    let habits;
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      habits = JSON.parse(cleanText);

      // Ensure it's an array
      if (!Array.isArray(habits)) {
        habits = [habits];
      }

      // Limit to 5 habits
      habits = habits.slice(0, 5);
    } catch (parseError) {
      // If parsing fails, split by newlines and clean up
      habits = text
        .split('\n')
        .filter(line => line.trim() && !line.includes('```'))
        .map(line => line.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '').trim())
        .filter(line => line.length > 0)
        .slice(0, 5);
    }

    res.status(200).json({ habits });
  } catch (error) {
    console.error("Error predicting habits:", error);
    res.status(500).json({
      message: "An error occurred while predicting habits",
      error: error.message
    });
  }
});

// Generate Daily Plan using Smart Rule-Based Generator
app.post("/generate-daily-plan", async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ message: "Please provide a prompt" });
    }

    // Smart plan generator function
    const generatePlan = (userPrompt) => {
      const lowerPrompt = userPrompt.toLowerCase();

      // Extract duration if mentioned
      const hourMatch = lowerPrompt.match(/(\d+)\s*hours?/);
      const totalHours = hourMatch ? parseInt(hourMatch[1]) : 8;

      // Determine activity type
      let activityType = 'general';
      let activities = [];

      if (lowerPrompt.includes('study') || lowerPrompt.includes('learn')) {
        activityType = 'study';
        activities = [
          { name: 'Morning Review & Planning', duration: 0.5, emoji: '📋' },
          { name: 'Deep Focus Study Session 1', duration: 2, emoji: '📚' },
          { name: 'Short Break & Snack', duration: 0.5, emoji: '☕' },
          { name: 'Practice Problems & Exercises', duration: 2, emoji: '✍️' },
          { name: 'Lunch Break', duration: 1, emoji: '🍽️' },
          { name: 'Review & Note-Taking', duration: 1.5, emoji: '📝' },
          { name: 'Active Recall Practice', duration: 1.5, emoji: '🧠' },
          { name: 'Break & Stretch', duration: 0.5, emoji: '🧘' },
          { name: 'Deep Focus Study Session 2', duration: 2, emoji: '📖' },
          { name: 'Summary & Reflection', duration: 1, emoji: '💭' },
          { name: 'Light Review Before Bed', duration: 0.5, emoji: '🌙' }
        ];
      } else if (lowerPrompt.includes('workout') || lowerPrompt.includes('exercise') || lowerPrompt.includes('fitness')) {
        activityType = 'workout';
        activities = [
          { name: 'Warm-up & Stretching', duration: 0.25, emoji: '🤸' },
          { name: 'Cardio Session', duration: 0.5, emoji: '🏃' },
          { name: 'Strength Training - Upper Body', duration: 0.5, emoji: '💪' },
          { name: 'Water Break', duration: 0.08, emoji: '💧' },
          { name: 'Strength Training - Lower Body', duration: 0.5, emoji: '🦵' },
          { name: 'Core Exercises', duration: 0.25, emoji: '🔥' },
          { name: 'Cool Down & Stretching', duration: 0.17, emoji: '🧘' }
        ];
      } else if (lowerPrompt.includes('coding') || lowerPrompt.includes('programming') || lowerPrompt.includes('development')) {
        activityType = 'coding';
        activities = [
          { name: 'Morning Planning & Task Review', duration: 0.5, emoji: '📋' },
          { name: 'Deep Work - Core Development', duration: 2, emoji: '💻' },
          { name: 'Coffee Break', duration: 0.25, emoji: '☕' },
          { name: 'Code Review & Debugging', duration: 1.5, emoji: '🐛' },
          { name: 'Lunch Break', duration: 1, emoji: '🍽️' },
          { name: 'Feature Implementation', duration: 2, emoji: '⚡' },
          { name: 'Short Break & Walk', duration: 0.25, emoji: '🚶' },
          { name: 'Testing & Documentation', duration: 1.5, emoji: '📝' },
          { name: 'Learning New Tech/Tools', duration: 1, emoji: '🎓' },
          { name: 'Wrap-up & Tomorrow Planning', duration: 0.5, emoji: '✅' }
        ];
      } else if (lowerPrompt.includes('self') || lowerPrompt.includes('relax') || lowerPrompt.includes('personal')) {
        activityType = 'self-care';
        activities = [
          { name: 'Morning Meditation', duration: 0.5, emoji: '🧘' },
          { name: 'Healthy Breakfast', duration: 0.5, emoji: '🥗' },
          { name: 'Reading Time', duration: 1, emoji: '📚' },
          { name: 'Creative Hobby', duration: 1.5, emoji: '🎨' },
          { name: 'Walk in Nature', duration: 1, emoji: '🌳' },
          { name: 'Lunch', duration: 0.5, emoji: '🍽️' },
          { name: 'Personal Project Time', duration: 1.5, emoji: '🛠️' },
          { name: 'Relaxation & Music', duration: 0.5, emoji: '🎵' },
          { name: 'Evening Reflection', duration: 0.5, emoji: '💭' }
        ];
      } else if (lowerPrompt.includes('mindful') || lowerPrompt.includes('meditation') || lowerPrompt.includes('mental')) {
        activityType = 'mindfulness';
        activities = [
          { name: 'Morning Breathing Exercise', duration: 0.25, emoji: '🌅' },
          { name: 'Guided Meditation', duration: 0.5, emoji: '🧘' },
          { name: 'Mindful Walking', duration: 0.5, emoji: '🚶' },
          { name: 'Journaling', duration: 0.5, emoji: '📔' },
          { name: 'Yoga Session', duration: 1, emoji: '🧘' },
          { name: 'Mindful Eating', duration: 0.5, emoji: '🍵' },
          { name: 'Gratitude Practice', duration: 0.25, emoji: '🙏' },
          { name: 'Evening Reflection', duration: 0.5, emoji: '🌙' }
        ];
      } else if (lowerPrompt.includes('work') || lowerPrompt.includes('productive')) {
        activityType = 'work';
        activities = [
          { name: 'Morning Planning', duration: 0.5, emoji: '📋' },
          { name: 'Priority Task 1', duration: 2, emoji: '🎯' },
          { name: 'Break', duration: 0.25, emoji: '☕' },
          { name: 'Meetings & Collaboration', duration: 1.5, emoji: '👥' },
          { name: 'Lunch', duration: 1, emoji: '🍽️' },
          { name: 'Priority Task 2', duration: 2, emoji: '⚡' },
          { name: 'Email & Admin Work', duration: 1, emoji: '📧' },
          { name: 'Wrap-up & Planning', duration: 0.5, emoji: '✅' }
        ];
      } else {
        // Balanced general day
        activities = [
          { name: 'Morning Routine', duration: 1, emoji: '🌅' },
          { name: 'Focused Work Session', duration: 2, emoji: '💼' },
          { name: 'Break & Refresh', duration: 0.5, emoji: '☕' },
          { name: 'Productive Tasks', duration: 2, emoji: '✅' },
          { name: 'Lunch Break', duration: 1, emoji: '🍽️' },
          { name: 'Afternoon Activities', duration: 2, emoji: '⚡' },
          { name: 'Personal Time', duration: 1.5, emoji: '🎯' },
          { name: 'Evening Wind Down', duration: 1, emoji: '🌙' }
        ];
      }

      // Scale activities to fit requested duration
      const totalActivityDuration = activities.reduce((sum, act) => sum + act.duration, 0);
      const scaleFactor = totalHours / totalActivityDuration;

      // Generate schedule starting at 9 AM by default
      let currentTime = 9 * 60; // 9 AM in minutes
      let schedule = [];

      // Add title
      schedule.push(`# 📅 Your Personalized ${totalHours}-Hour Daily Plan\n`);
      schedule.push(`*Generated based on: "${userPrompt}"*\n`);
      schedule.push(`---\n`);

      activities.forEach(activity => {
        const scaledDuration = activity.duration * scaleFactor;

        // Round currentTime to avoid decimal minutes
        const totalMinutes = Math.round(currentTime);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        const timeStr = `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;

        schedule.push(`### ${timeStr} - ${activity.emoji} ${activity.name}`);
        schedule.push(`*Duration: ${Math.round(scaledDuration * 60)} minutes*\n`);

        currentTime += scaledDuration * 60;
      });

      schedule.push(`\n---\n`);
      schedule.push(`**Total Duration:** ${totalHours} hours`);
      schedule.push(`\n**Tips for Success:**`);
      schedule.push(`- ✅ Stay hydrated throughout the day`);
      schedule.push(`- ✅ Take short breaks between activities`);
      schedule.push(`- ✅ Adjust times based on your energy levels`);
      schedule.push(`- ✅ Be flexible and adapt as needed`);

      return schedule.join('\n');
    };

    const plan = generatePlan(prompt);
    res.status(200).json({ plan });

  } catch (error) {
    console.error("Error generating daily plan:", error);
    res.status(500).json({
      message: "An error occurred while generating the plan",
      error: error.message
    });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
