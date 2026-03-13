import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Settings, Activity, Award } from 'lucide-react';

const UserPanelDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: User,
      title: 'Profile Management',
      description: 'Edit your profile, update information, and manage your account settings',
      color: 'purple'
    },
    {
      icon: Activity,
      title: 'Activity Overview',
      description: 'Track your habits, streaks, and daily progress in one place',
      color: 'blue'
    },
    {
      icon: Settings,
      title: 'Customizable Settings',
      description: 'Control notifications, email updates, and appearance preferences',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Achievements & Stats',
      description: 'View your accomplishments, badges, and milestone progress',
      color: 'orange'
    }
  ];

  const handleDemo = () => {
    // Set demo data
    localStorage.setItem('userName', 'Demo User');
    localStorage.setItem('userEmail', 'demo@pranaflow.com');
    localStorage.setItem('joinDate', new Date().toLocaleDateString());
    navigate('/user-panel');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">User Panel</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your profile, track your progress, and customize your experience
          </p>
          <button
            onClick={handleDemo}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Try Demo
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              purple: 'from-purple-500 to-purple-600',
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              orange: 'from-orange-500 to-orange-600'
            };

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[feature.color]} rounded-lg flex items-center justify-center text-white mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Screenshot Preview */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Inside</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PreviewCard
              title="Overview"
              items={['Statistics Dashboard', 'Quick Actions', 'Recent Activity', 'Progress Tracking']}
            />
            <PreviewCard
              title="Profile"
              items={['Edit Information', 'Update Email', 'Avatar Management', 'Account Details']}
            />
            <PreviewCard
              title="Settings"
              items={['Notifications', 'Email Preferences', 'Theme Options', 'Privacy Controls']}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 opacity-90">
              Access your personalized dashboard and take control of your wellness journey
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleDemo}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Open User Panel
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewCard = ({ title, items }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2 text-gray-700">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default UserPanelDemo;
