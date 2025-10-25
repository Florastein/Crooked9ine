import React from 'react';

interface AuthProviderButtonProps {
    provider: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export const AuthProviderButton: React.FC<AuthProviderButtonProps> = ({ provider, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
            <span className="mr-2">{icon}</span>
            {provider}
        </button>
    );
};