// App.jsx
import "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import AboutPage from "./components/AboutPage";
import GetInvolvedPage from "./components/GetInvolvedPage";
import MainPage from "./components/MainPage";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import HabitTracker from "./components/HabitTracker";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import DailyPlanner from "./components/dailyPlanner/DailyPlanner";
import { ScheduleProvider } from "./components/ScheduleContext"; // Import ScheduleProvider
import Blog from "./components/Blog"


//imports for individual blog cards
import Blog1 from "./components/blog/blog_cards/blog1";
import Blog2 from "./components/blog/blog_cards/blog2";
import Blog3 from "./components/blog/blog_cards/blog3";
import Blog4 from "./components/blog/blog_cards/blog4";
import Blog5 from "./components/blog/blog_cards/blog5";
import Blog6 from "./components/blog/blog_cards/blog6";
import FoodRecognition from "./components/FoodRecognition";
import UserPanel from "./components/UserPanel";
import UserPanelDemo from "./components/UserPanelDemo";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <ScheduleProvider> {/* Wrap the entire app */}
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />

          {/* About Page */}
          <Route
            path="/about"
            element={
              <>
                <AboutPage />
              </>
            }
          />

          {/* Get Involved Page */}
          <Route
            path="/get-involved"
            element={
              <>
                <GetInvolvedPage />
                <Footer />
              </>
            }
          />



          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Forgot Password Page */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Sign Up Page */}
          <Route path="/signup" element={<SignUpPage />} />

          {/* Dashboard Page */}
          <Route path="/mainpage" element={<MainPage />} />

          {/* Profile Page */}
          {/* <Route path="/profile" element={<Profile />} /> */}

          {/* User Panel */}
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/admin-panel" element={<AdminPanel />} />

          {/* Dashboard Page */}
          <Route path="/dashboard" element={<FoodRecognition />} />
          <Route path="/dash" element={<Dashboard />} />
          {/* Daily Planner Page */}
          <Route path="/daily-planner" element={<DailyPlanner />} />




          {/* Habit Tracker Page */}
          <Route path="/habit-tracker" element={<HabitTracker />} />

          {/* Blog Page */}
          <Route path="/blog" element={<Blog />} />

          {/* Router for individual Blogs */}
          <Route path="/blog/1" element={<Blog1 />} />
          <Route path="/blog/2" element={<Blog2 />} />
          <Route path="/blog/3" element={<Blog3 />} />
          <Route path="/blog/4" element={<Blog4 />} />
          <Route path="/blog/5" element={<Blog5 />} />
          <Route path="/blog/6" element={<Blog6 />} />



        </Routes>
      </Router>
    </ScheduleProvider>
  );
}

export default App;
