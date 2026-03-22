import React, { useState } from 'react';
import { UserRole } from '../constants';
import { LeafIcon } from './shared/icons/LeafIcon';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.FARMER);

  const handleLoginClick = () => {
    // In a real app, you would handle form submission here.
    // For this mock, we just log in with the selected role.
    onLogin(activeRole);
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Header */}
      <header className="relative z-10 w-full text-white">
        <div className="container mx-auto flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <LeafIcon className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold tracking-tight">Agri-Connect</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Login to Your Account</h2>
                    <p className="text-center text-sm text-gray-500 mb-6">Unified Gateway for Agrarian Management</p>

                    {/* Role Tabs */}
                    <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setActiveRole(UserRole.FARMER)}
                            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-all duration-300 ${activeRole === UserRole.FARMER ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`}
                        >
                            Farmer
                        </button>
                        <button
                            onClick={() => setActiveRole(UserRole.MARKETER)}
                            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-all duration-300 ${activeRole === UserRole.MARKETER ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`}
                        >
                            Marketer
                        </button>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLoginClick(); }}>
                        <div>
                            <label htmlFor="userId" className="text-sm font-medium text-gray-700">Farmer / Marketer ID</label>
                            <input 
                                type="text"
                                id="userId"
                                placeholder="Enter your ID or Mobile Number"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                           <a href="#" className="font-medium text-green-600 hover:text-green-500">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                        >
                            Login
                        </button>

                         <p className="text-center text-xs text-gray-500 mt-4">
                            Don't have an account? <a href="#" className="font-medium text-green-600 hover:text-green-500">Create New Account</a>
                        </p>
                    </form>
                </div>
            </div>
             <p className="text-xs text-center text-white/70 mt-6">
              © 2024 Agri-Connect. All Rights Reserved.
            </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;