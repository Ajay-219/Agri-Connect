
import React from 'react';
import { User } from '../../types';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  user: User;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, setActivePage }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center">
        {/* Search Bar */}
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="q" className="py-2 text-sm text-white bg-gray-200 dark:bg-gray-700 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autoComplete="off" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <button 
          onClick={() => setActivePage('Profile')}
          className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="View profile"
        >
          <div className="text-right">
              <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</p>
          </div>
          <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="User Avatar" />
        </button>
      </div>
    </header>
  );
};

export default Header;