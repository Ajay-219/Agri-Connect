import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './components/LandingPage';
import { User } from './types';
import { UserRole } from './constants';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const handleEnterPortal = () => {
    setShowLanding(false);
  };

  const handleLogin = useCallback((role: UserRole) => {
    // In a real app, this would involve an API call.
    // Here, we'll create a mock user.
    if (role === UserRole.FARMER) {
      setUser({
        name: 'Alex Johnson',
        role: UserRole.FARMER,
        avatar: 'https://picsum.photos/id/1027/100/100',
      });
    } else {
      setUser({
        name: 'Ben Carter',
        role: UserRole.MARKETER,
        avatar: 'https://picsum.photos/id/1005/100/100',
      });
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    // After logout, we should be on the login page, not the landing page again.
    setShowLanding(false);
  }, []);

  if (showLanding) {
    return <LandingPage onEnterPortal={handleEnterPortal} />;
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardLayout user={user} onLogout={handleLogout} />;
};

export default App;