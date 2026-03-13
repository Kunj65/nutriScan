import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Activity, Calendar, Target, TrendingUp, Award } from 'lucide-react';
import axios from 'axios';

const UserPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || 'User',
    email: localStorage.getItem('userEmail') || 'user@example.com',
    joinDate: localStorage.getItem('joinDate') || new Date().toLocaleDateString(),
    avatar: localStorage.getItem('userAvatar') || null,
    history: []
  });

  const [stats, setStats] = useState({
    habitsCompleted: 0,
    currentStreak: 0,
    totalDays: 0,
    achievements: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      if (email) {
        try {
          const response = await axios.get(`http://localhost:3000/user-profile?email=${email}`);
          const user = response.data;

          const history = user.predictionHistory || [];

          setUserData(prev => ({
            ...prev,
            name: user.name,
            email: user.email,
            joinDate: new Date(user.createdAt).toLocaleDateString(),
            history: history
          }));

          // Calculate stats
          const totalScans = history.length;

          // Calculate streak
          let streak = 0;
          if (history.length > 0) {
            const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
            const today = new Date().setHours(0, 0, 0, 0);
            let lastDate = new Date(sorted[0].date).setHours(0, 0, 0, 0);

            // Check if last activity was today or yesterday
            if (lastDate === today || lastDate === today - 86400000) {
              streak = 1;
              for (let i = 1; i < sorted.length; i++) {
                const d = new Date(sorted[i].date).setHours(0, 0, 0, 0);
                if (d === lastDate) continue;
                if (d === lastDate - 86400000) {
                  streak++;
                  lastDate = d;
                } else {
                  break;
                }
              }
            }
          }

          const daysMember = Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));

          setStats({
            habitsCompleted: totalScans,
            currentStreak: streak,
            totalDays: daysMember,
            achievements: Math.floor(totalScans / 5)
          });

        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchUserData();
  }, []);



  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Panel</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === tab.id
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => navigate('/mainpage')}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && <OverviewTab stats={stats} userData={userData} navigate={navigate} />}
            {activeTab === 'profile' && <ProfileTab userData={userData} setUserData={setUserData} />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, userData, navigate }) => {
  // Sort history by date descending
  const recentActivity = userData.history
    ? [...userData.history].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {userData.name}!</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Target}
            label="Food Scans"
            value={stats.habitsCompleted}
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            label="Current Streak"
            value={`${stats.currentStreak} days`}
            color="blue"
          />
          <StatCard
            icon={Calendar}
            label="Total Days"
            value={stats.totalDays}
            color="green"
          />
          <StatCard
            icon={Award}
            label="Achievements"
            value={stats.achievements}
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickActionCard
              title="Habit Tracker"
              description="Track your daily habits"
              onClick={() => navigate('/habit-tracker')}
              color="purple"
            />
            <QuickActionCard
              title="Daily Planner"
              description="Plan your day"
              onClick={() => navigate('/daily-planner')}
              color="blue"
            />
            <QuickActionCard
              title="Food Recognition"
              description="Scan your meals"
              onClick={() => navigate('/dashboard')}
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((item, index) => (
              <ActivityItem
                key={index}
                text={`Scanned: ${item.prediction}`}
                time={new Date(item.date).toLocaleDateString()}

              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activity found. Start scanning food!</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleSave = () => {
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    setUserData(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
          <input
            type="text"
            value={userData.joinDate}
            disabled
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

      <div className="space-y-6">
        <SettingToggle
          label="Push Notifications"
          description="Receive notifications about your habits and goals"
          checked={notifications}
          onChange={setNotifications}

        />
        <SettingToggle
          label="Email Updates"
          description="Get weekly progress reports via email"
          checked={emailUpdates}
          onChange={setEmailUpdates}

        />

      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-4 text-white`}>
      <Icon size={24} className="mb-2" />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
};

const QuickActionCard = ({ title, description, onClick, color }) => {
  const colorClasses = {
    purple: 'hover:border-purple-500 hover:bg-purple-50',
    blue: 'hover:border-blue-500 hover:bg-blue-50',
    green: 'hover:border-green-500 hover:bg-green-50'
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 border-2 border-gray-200 rounded-xl transition ${colorClasses[color]} text-left`}
    >
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

const ActivityItem = ({ text, time }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <p className="text-gray-700">{text}</p>
    <span className="text-sm text-gray-500">{time}</span>
  </div>
);

const SettingToggle = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-semibold text-gray-900">{label}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition ${checked ? 'bg-purple-500' : 'bg-gray-300'
        }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform ${checked ? 'translate-x-6' : ''
          }`}
      />
    </button>
  </div>
);

export default UserPanel;
