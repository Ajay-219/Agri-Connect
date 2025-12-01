
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', icon }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
          {icon && <div className="text-green-500">{icon}</div>}
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
