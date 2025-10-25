import React, { useState } from 'react';
import { AuthProviderButton } from './components/AuthProviderButton';
import { GoogleIcon } from './components/icons/GoogleIcon';
import { MicrosoftIcon } from './components/icons/MicrosoftIcon';
import { AppleIcon } from './components/icons/AppleIcon';

type AuthView = 'login' | 'signup';

const App: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div>
        <main className="w-full max-w-4xl mx-auto flex">
          <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-l-xl">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-xl"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAa7pjnjytnfyrvdE6Vr0AZefQCs2h1142Shr_RX-FqXvhWcM33vfUBgiiKrITbejgU6U8sqsByurdx6599cLu5-qW8NWKUI9IxAEIGjy1hfGZfiiDyrRl3HLcpYtippLOBdft_dXHOtE_H_VpIrOrVvES8cYcnvbAoe9alvv4aLMjDWO2nSUF727EMAPrnScRjcusl1OZfnElHwwxFlvn-ZvqeJSOzrIu8RFrdVFMaB3j451PvfIM93qFn2gBgF7cahXGIqKtdIYdr")`,
              }}
              data-alt="A modern office building with a unique architectural design."
            ></div>
          </div>
          <div className="w-full md:w-1/2 bg-white dark:bg-background-dark p-8 md:p-12 flex flex-col justify-center rounded-xl md:rounded-l-none md:rounded-r-xl shadow-lg">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-primary dark:text-white">crooked9ine</h1>
                <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111418] dark:text-white mt-2">
                  {view === 'login' ? 'Welcome Back' : 'Create an Account'}
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-6">
                  {view === 'signup' && (
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#111418] dark:text-text-dark text-base font-medium leading-normal pb-2">Full Name</p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-text-dark focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                        placeholder="Enter your full name"
                        type="text"
                      />
                    </label>
                  )}
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111418] dark:text-text-dark text-base font-medium leading-normal pb-2">Email Address</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-text-dark focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </label>
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111418] dark:text-text-dark text-base font-medium leading-normal pb-2">Password</p>
                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-text-dark focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                        placeholder="Enter your password"
                        type={passwordVisible ? 'text' : 'password'}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-[#617589] dark:text-gray-400 flex border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer focus:outline-none"
                      >
                        <span className="material-symbols-outlined">
                          {passwordVisible ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </label>
                </div>

                {view === 'login' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 space-y-4 sm:space-y-0">
                    <label className="flex gap-x-3 items-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-[#dbe0e6] dark:border-gray-600 border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:border-primary focus:outline-none"
                      />
                      <p className="text-[#111418] dark:text-text-dark text-base font-normal leading-normal">Remember Me</p>
                    </label>
                    <a href="#" className="text-sm text-primary-light hover:text-primary dark:hover:text-primary-light font-medium">
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg mt-8 hover:bg-opacity-90 transition duration-300 h-14"
                >
                  {view === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              </form>

              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative inline-block px-4 bg-white dark:bg-background-dark text-sm text-gray-500 dark:text-gray-400">
                  Or continue with
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <AuthProviderButton icon={<GoogleIcon className="h-6 w-6 mr-2" />} text="Google" />
                <AuthProviderButton icon={<MicrosoftIcon className="h-6 w-6 mr-2" />} text="Microsoft" />
                <AuthProviderButton icon={<AppleIcon className="h-6 w-6 mr-2" />} text="Apple" />
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
                {view === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={toggleView}
                  className="font-medium text-primary-light hover:text-primary dark:hover:text-primary-light"
                >
                  {view === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </main>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Powered by NetHub Dukel
        </p>
      </div>
    </div>
  );
};

export default App;