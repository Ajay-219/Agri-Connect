import React, { useState } from 'react';
import { User } from '../../types';
import { UserRole } from '../../constants';
import Card from '../shared/Card';
import Button from '../shared/Button';

interface ProfilePageProps {
  user: User;
}

const InfoField: React.FC<{ label: string; value: string; isEditing: boolean; onChange: (value: string) => void; }> = ({ label, value, isEditing, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
            {isEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
            ) : (
                <p className="mt-1 text-md text-gray-800 dark:text-white">{value}</p>
            )}
        </div>
    );
};

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data for profile details, would come from API in a real app
  const [profileData, setProfileData] = useState({
      fullName: user.name,
      email: `${user.name.toLowerCase().replace(' ', '.')}@agri-connect.com`,
      phone: '123-456-7890',
      farmName: 'Green Valley Farms',
      farmLocation: 'Central Valley, CA',
      farmSize: '250 acres',
      companyName: 'Fresh Produce Inc.',
      businessRegNo: 'B-REG-98765',
      businessAddress: '100 Market St, San Francisco, CA'
  });

  const handleFieldChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
        <div className="relative">
          <img className="h-24 w-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-900" src={user.avatar} alt="User Avatar" />
           <button className="absolute bottom-0 right-0 bg-green-600 p-1.5 rounded-full text-white hover:bg-green-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
           </button>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h1>
          <p className="text-md text-gray-500 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</p>
        </div>
        <div className="sm:ml-auto flex gap-2">
            {isEditing ? (
                <>
                    <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                </>
            ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
        </div>
      </div>
      
      <Card title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Full Name" value={profileData.fullName} isEditing={isEditing} onChange={(v) => handleFieldChange('fullName', v)} />
            <InfoField label="Email Address" value={profileData.email} isEditing={isEditing} onChange={(v) => handleFieldChange('email', v)} />
            <InfoField label="Phone Number" value={profileData.phone} isEditing={isEditing} onChange={(v) => handleFieldChange('phone', v)} />
        </div>
      </Card>

      {user.role === UserRole.FARMER && (
        <Card title="Farm Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Farm Name" value={profileData.farmName} isEditing={isEditing} onChange={(v) => handleFieldChange('farmName', v)} />
                <InfoField label="Location" value={profileData.farmLocation} isEditing={isEditing} onChange={(v) => handleFieldChange('farmLocation', v)} />
                <InfoField label="Farm Size (in acres)" value={profileData.farmSize} isEditing={isEditing} onChange={(v) => handleFieldChange('farmSize', v)} />
            </div>
        </Card>
      )}

      {user.role === UserRole.MARKETER && (
        <Card title="Business Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Company Name" value={profileData.companyName} isEditing={isEditing} onChange={(v) => handleFieldChange('companyName', v)} />
                <InfoField label="Business Registration No." value={profileData.businessRegNo} isEditing={isEditing} onChange={(v) => handleFieldChange('businessRegNo', v)} />
                <InfoField label="Business Address" value={profileData.businessAddress} isEditing={isEditing} onChange={(v) => handleFieldChange('businessAddress', v)} />
            </div>
        </Card>
      )}

      <Card title="Account Settings">
          <div>
              <Button variant="secondary">Change Password</Button>
          </div>
      </Card>
    </div>
  );
};

export default ProfilePage;