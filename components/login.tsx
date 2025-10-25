import React from "react";
import { GoogleIcon } from "./icons/GoogleIcon";
import { MicrosoftIcon } from "./icons/MicrosoftIcon";
import { AppleIcon } from "./icons/AppleIcon";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-4xl mx-auto flex rounded-xl shadow-lg overflow-hidden">
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAa7pjnjytnfyrvdE6Vr0AZefQCs2h1142Shr_RX-FqXvhWcM33vfUBgiiKrITbejgU6U8sqsByurdx6599cLu5-qW8NWKUI9IxAEIGjy1hfGZfiiDyrRl3HLcpYtippLOBdft_dXHOtE_H_VpIrOrVvES8cYcnvbAoe9alvv4aLMjDWO2nSUF727EMAPrnScRjcusl1OZfnElHwwxFlvn-ZvqeJSOzrIu8RFrdVFMaB3j451PvfIM93qFn2gBgF7cahXGIqKtdIYdr")',
            }}
            role="img"
            aria-label="Office hero"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white dark:bg-background-dark p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <img src="../llogo.png" alt="crooked9ine logo" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold text-primary dark:text-white">crooked9ine</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project dashboard</p>
            </div>
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-[#111418] dark:text-white mb-6">Welcome Back</h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <label className="flex flex-col">
              <span className="text-[#111418] dark:text-text-dark text-base font-medium pb-2">Email Address</span>
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-input rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#111418] dark:text-text-dark h-14 px-4 placeholder:text-[#617589]"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-[#111418] dark:text-text-dark text-base font-medium pb-2">Password</span>
              <div className="flex items-center">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input flex-1 rounded-l-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#111418] dark:text-text-dark h-14 px-4 placeholder:text-[#617589]"
                  required
                />
                <button
                  type="button"
                  className="text-[#617589] dark:text-gray-400 flex items-center justify-center border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-700 h-14 px-4 rounded-r-lg"
                  aria-label="toggle password visibility"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-5 w-5 rounded border-[#dbe0e6] dark:border-gray-600" />
                <span className="text-[#111418] dark:text-text-dark">Remember Me</span>
              </label>
              <a className="text-sm text-primary-light hover:text-primary dark:hover:text-primary-light" href="#">Forgot Password?</a>
            </div>

            <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition h-14" onClick={onLogin}>Log In</button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative inline-block px-4 bg-white dark:bg-background-dark text-sm text-gray-500 dark:text-gray-400">Or continue with</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <GoogleIcon className="h-5 w-5 mr-2"/>
              <span className="text-sm font-medium text-[#111418] dark:text-text-dark">Google</span>
            </button>

            <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <MicrosoftIcon alt="Microsoft" className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium text-[#111418] dark:text-text-dark">Microsoft</span>
            </button>

            <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <AppleIcon alt="Apple" className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium text-[#111418] dark:text-text-dark">Apple</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account? <a className="font-medium text-primary-light hover:text-primary" href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
