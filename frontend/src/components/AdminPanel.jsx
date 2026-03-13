import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            showToast('Failed to fetch users', 'error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleLogout = () => {
        // Clear any stored auth tokens if implemented
        navigate('/login');
    };

    const handleDeleteUser = async (email, userName, userId) => {
        // Prevent deleting admin accounts
        const user = users.find(u => u.email === email);
        if (user && user.role === 'admin') {
            showToast('Cannot delete admin accounts!', 'error');
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete user "${userName}"? This action cannot be undone.`
        );

        if (confirmed) {
            setDeletingUserId(userId);
            try {
                const response = await axios.delete('http://localhost:3000/delete-account', {
                    data: { email: email }
                });

                if (response.status === 200) {
                    showToast(`User "${userName}" deleted successfully!`, 'success');
                    // Refresh the user list
                    await fetchUsers();
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                if (error.response && error.response.status === 404) {
                    showToast('User not found!', 'error');
                } else {
                    showToast('Failed to delete user. Please try again.', 'error');
                }
            } finally {
                setDeletingUserId(null);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Toast Notification */}
            {toast.show && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                    <div className="flex items-center space-x-2">
                        {toast.type === 'success' ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        )}
                        <span className="font-medium">{toast.message}</span>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700">Registered Users</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Joined At
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.role === 'admin' ? 'text-green-900' : 'text-blue-900'}`}>
                                                <span aria-hidden className={`absolute inset-0 ${user.role === 'admin' ? 'bg-green-200' : 'bg-blue-200'} opacity-50 rounded-full`}></span>
                                                <span className="relative">{user.role}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                onClick={() => handleDeleteUser(user.email, user.name, user._id)}
                                                className={`${user.role === 'admin' || deletingUserId === user._id
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-red-500 hover:bg-red-600'
                                                    } text-white font-bold py-2 px-4 rounded text-xs flex items-center space-x-2`}
                                                disabled={user.role === 'admin' || deletingUserId === user._id}
                                            >
                                                {deletingUserId === user._id ? (
                                                    <>
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Deleting...</span>
                                                    </>
                                                ) : (
                                                    <span>Delete</span>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
