
// ===============================
// NUTRISCAN BACKEND SERVER
// ===============================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const OpenAI = require("openai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5001;

// ===============================
// MODELS
// ===============================
const User = require("./models/User");
const  Message  = require("./models/Message");
const  Conversations  = require("./models/conversions");

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ===============================
// DATABASE CONNECTION
// ===============================
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/Prana_Flow";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    seedAdmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// ===============================
// SEED ADMIN USER (OPTIONAL)
// ===============================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const seedAdmin = async () => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log(
      "Skipping admin seed. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to enable."
    );
    return;
  }

  try {
    const adminExists = await User.findOne({ email: ADMIN_EMAIL });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      const adminUser = new User({
        name: "Admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
  } catch (err) {
    console.error("Admin seed error:", err);
  }
};

// ===============================
// OPENAI / OPENROUTER SETUP
// ===============================
const openaiApiKey =
  process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

let openai;

function getOpenAIClient() {
  if (!openaiApiKey) {
    console.log("no api key found");
    return null;
  }

  if (openai) return openai;

  openai = new OpenAI({
    apiKey: openaiApiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": FRONTEND_URL,
      "X-Title": "NutriScan",
    },
  });

  return openai;
}

// ===============================
// AI CHAT ROUTE
// ===============================
const systemPrompt = {
  role: "system",
  content: `
You are an intelligent lifestyle and wellness planner.

Your job is to generate practical and realistic DAILY or WEEKLY plans based on the user's goals, habits they want to build, habits they want to avoid, health goals, food preferences, exercise goals, or productivity activities.

Guidelines:

1. Carefully understand what the user wants to:
   - Start doing (good habits)
   - Stop or avoid (bad habits)
   - Improve (health, productivity, fitness, focus, diet, sleep, etc.)

2. Generate a structured plan that is:
   - Clear
   - Easy to follow
   - Practical for a normal person
   - Balanced between work, health, and rest

3. The plan may include:
   - Morning routine
   - Work/study focus blocks
   - Exercise or physical activity
   - Healthy meals or food habits
   - Breaks and relaxation
   - Evening routine
   - Sleep schedule
   - Habit tracking suggestions

4. If the user asks for:
   - A DAILY plan → create a detailed day schedule.
   - A WEEKLY plan → organize activities across 7 days.

5. Always include:
   - Time suggestions
   - Healthy habits
   - Small achievable actions

6. If the user wants to avoid something (e.g. junk food, social media, smoking), suggest healthy alternatives and strategies.

7. For health-related plans include:
   - hydration
   - balanced meals
   - physical movement
   - rest and recovery

8. Keep the response structured using headings and bullet points.

9. Do not give medical diagnoses. Only give general wellness guidance.

10. The tone should be motivating, supportive, and practical.

Output format example:

Daily Plan:
Morning
Afternoon
Evening
Night

or

Weekly Plan:
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday

Always keep the plan actionable and realistic.
`
};
app.post("/dailyAI", async (req, res) => { 
  try {

     
    const client = getOpenAIClient();

    if (!client) {
      return res.status(500).json({
        error: "API key not configured",
      });
    }

    const { messages = [], conversationId } = req.body;

    let convId = conversationId;

    if (!convId) {
      const conversation = await Conversations.create({});
      convId = conversation._id;
    }

    const lastUserMessage = messages[messages.length - 1] || { content: "" };

    await Message.create({
      role: "user",
      content: lastUserMessage.content,
      conversationId: convId,
    });

    const stream = await client.responses.stream({
      model: "openai/gpt-4o-mini",
      input: [systemPrompt , ...messages],
      temperature: 1,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.2,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("x-conversation-id", convId.toString());

    let aiText = "";

    for await (const part of stream) {
      if (part.type === "response.output_text.delta") {
        const token = part.delta;
        if (token) {
          aiText += token;
          res.write(
            `data: ${JSON.stringify({
              choices: [{ delta: { content: token } }],
            })}\n\n`
          );
        }
      }
    }

    await Message.create({
      role: "assistant",
      content: aiText,
      conversationId: convId,
    });

    res.end();
  } catch (err) {
    console.error("AI error FULL:", err);
    res.status(500).json({
      error: err.message,
      details: err
    });
  }
});

// ===============================
// AUTH ROUTES
// ===============================

const safeUser = (user) => {
  if (!user) return null;
  const { password, __v, ...rest } = user.toObject ? user.toObject() : user;
  return rest;
};

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      user: safeUser(user),
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: safeUser(user),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email, password, confirm_password } = req.body;

  if (!email || !password || !confirm_password) {
    return res.status(400).json({ error: "Email and both password fields are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Password reset failed" });
  }
});

// ===============================
// USER PROFILE
// ===============================

app.post("/profile", async (req, res) => {
  const { email, weight, height, age, workingHours, profession, interests, problems } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const updates = {};

    if (weight !== undefined) updates.weight = weight;
    if (height !== undefined) updates.height = height;
    if (age !== undefined) updates.age = age;
    if (workingHours !== undefined) updates.workingHours = workingHours;
    if (profession !== undefined) updates.profession = profession;
    if (interests !== undefined) updates.interests = interests;
    if (problems !== undefined) updates.problems = problems;

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: updates },
      { new: true, projection: "-password" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.send("NutriScan Backend Running 🚀");
});

// Delete Account
app.delete("/delete-account", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    await User.deleteOne({ email: email.toLowerCase() });
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "An error occurred while deleting the account." });
  }
});

// Get User Profile
app.get("/user-profile", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() }, "-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Get all users (for Admin Panel)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Predict Habits using AI
app.post("/predict-habits", async (req, res) => {
  const { query } = req.body;

  if (typeof model === 'undefined') {
    return res.status(501).json({ message: "Habit prediction model is not configured" });
  }

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



// ===============================
// START SERVER
// ===============================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

