import React, { useState } from 'react';
import { User } from '../types';
import Sidebar from './shared/Sidebar';
import Header from './shared/Header';
import FarmerDashboard from './farmer/FarmerDashboard';
import MarketerDashboard from './marketer/MarketerDashboard';
import MyCropsPage from './farmer/MyCropsPage';
import MarketListings from './marketer/MarketListings';
import { UserRole } from '../constants';
import ProfilePage from './profile/ProfilePage';
import ChatPage from './chat/ChatPage';
import WeatherPage from './farmer/WeatherPage';
import MarketplacePage from './farmer/MarketplacePage';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState(user.role === UserRole.FARMER ? 'Social Feed' : 'Dashboard');

  const renderContent = () => {
    if (activePage === 'Profile') {
      return <ProfilePage user={user} />;
    }

    if (user.role === UserRole.FARMER) {
      switch (activePage) {
        case 'Social Feed':
          return <FarmerDashboard />;
        case 'My Crops':
          return <MyCropsPage />;
        case 'Markets':
          return <MarketplacePage />;
        case 'Weather':
          return <WeatherPage />;
        case 'Messages':
          return <ChatPage />;
        default:
          return <FarmerDashboard />;
      }
    } else { // MARKETER
      switch (activePage) {
        case 'Dashboard':
          return <MarketerDashboard />;
        case 'My Listings':
          return <MarketListings />;
        case 'Farmer Connect':
          return <ChatPage />;
        default:
          return <MarketerDashboard />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar 
        userRole={user.role} 
        onLogout={onLogout} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} setActivePage={setActivePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;