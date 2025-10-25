import React, { useState } from 'react';
import { AuthProviderButton } from '../components/AuthProviderButton';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { MicrosoftIcon } from '../components/icons/MicrosoftIcon';
import { AppleIcon } from '../components/icons/AppleIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeOffIcon } from '../components/icons/EyeOffIcon';


export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4">
        {/* Image Section */}
        <div 
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAa7pjnjytnfyrvdE6Vr0AZefQCs2h1142Shr_RX-FqXvhWcM33vfUBgiiKrITbejgU6U8sqsByurdx6599cLu5-qW8NWKUI9IxAEIGjy1hfGZfiiDyrRl3HLcpYtippLOBdft_dXHOtE_H_VpIrOrVvES8cYcnvbAoe9alvv4aLMjDWO2nSUF727EMAPrnScRjcusl1OZfnElHwwxFlvn-ZvqeJSOzrIu8RFrdVFMaB3j451PvfIM93qFn2gBgF7cahXGIqKtdIYdr")',
            }}
          aria-hidden="true"
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-left">
            <p className="font-bold text-lg text-gray-900">crooked9ine</p>
            <h1 className="text-4xl font-bold mt-4 text-gray-900">Welcome Back</h1>
          </div>
          
          <form className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="email-address" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon className="h-6 w-6 text-gray-500" /> : <EyeIcon className="h-6 w-6 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gray-800 focus:ring-gray-700 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                  Remember Me
                </label>
              </div>

              <div>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <AuthProviderButton provider="Google" icon={<GoogleIcon />} />
            <AuthProviderButton provider="Microsoft" icon={<MicrosoftIcon />} />
            <AuthProviderButton provider="Apple" icon={<AppleIcon />} />
          </div>

          <div className="text-sm text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};