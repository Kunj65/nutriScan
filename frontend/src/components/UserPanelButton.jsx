import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const UserPanelButton = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <button
      onClick={() => navigate('/user-panel')}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition shadow-lg hover:shadow-xl"
    >
      <User size={20} />
      <span className="font-medium">{userName}</span>
    </button>
  );
};

export default UserPanelButton;
