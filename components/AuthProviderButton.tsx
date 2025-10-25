import React from 'react';

interface AuthProviderButtonProps {
  icon: React.ReactNode;
  text: string;
}

export const AuthProviderButton: React.FC<AuthProviderButtonProps> = ({ icon, text }) => {
  return (
    <button className="flex items-center justify-center w-full border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300">
      {icon}
      <span className="text-sm font-medium text-[#111418] dark:text-text-dark">{text}</span>
    </button>
  );
};
