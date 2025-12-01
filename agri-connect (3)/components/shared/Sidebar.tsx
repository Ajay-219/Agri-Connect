import React from 'react';
import { UserRole } from '../../constants';
import { HomeIcon } from './icons/HomeIcon';
import { LeafIcon } from './icons/LeafIcon';
import { MarketIcon } from './icons/MarketIcon';
import { WeatherIcon } from './icons/WeatherIcon';
import { ChatIcon } from './icons/ChatIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { ProfileIcon } from './icons/ProfileIcon';


interface SidebarProps {
  userRole: UserRole;
  onLogout: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const NavLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center p-3 my-1 w-full rounded-lg transition-colors duration-200 ${active ? 'bg-green-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'}`}>
    {icon}
    <span className="mx-4 font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ userRole, onLogout, activePage, setActivePage }) => {
  const farmerLinks = [
    { icon: <HomeIcon />, label: 'Social Feed' },
    { icon: <LeafIcon />, label: 'My Crops' },
    { icon: <MarketIcon />, label: 'Markets' },
    { icon: <WeatherIcon />, label: 'Weather' },
    { icon: <ChatIcon />, label: 'Messages' },
  ];

  const marketerLinks = [
    { icon: <HomeIcon />, label: 'Dashboard' },
    { icon: <MarketIcon />, label: 'My Listings' },
    { icon: <ChatIcon />, label: 'Farmer Connect' },
  ];

  const links = userRole === UserRole.FARMER ? farmerLinks : marketerLinks;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700">
      <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
         <div className="flex items-center gap-2">
            <LeafIcon className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Agri-Connect</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <nav>
           <NavLink 
              key="Profile" 
              icon={<ProfileIcon />} 
              label="Profile" 
              active={activePage === 'Profile'}
              onClick={() => setActivePage('Profile')}
            />
            <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
          {links.map((link) => (
            <NavLink 
              key={link.label} 
              icon={link.icon} 
              label={link.label} 
              active={activePage === link.label}
              onClick={() => setActivePage(link.label)}
            />
          ))}
        </nav>
      </div>
       <div className="p-4 border-t dark:border-gray-700">
          <button onClick={onLogout} className="flex items-center p-3 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-200">
            <LogoutIcon />
            <span className="mx-4 font-medium">Logout</span>
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;