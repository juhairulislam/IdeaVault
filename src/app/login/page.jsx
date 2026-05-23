'use client'
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  // Static state placeholders for your future implementation
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-zinc-950/50 overflow-hidden grid md:grid-cols-2 border border-zinc-100 dark:border-zinc-800/80 m-4">
        
        {/* Left Side: Branding & Visual Panel */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-linear-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
          {/* Subtle Background Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">IdeaVault</span>
            </div>
          </div>

          <div className="relative z-10 my-auto pt-8">
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-4">
              Architecting the Future of Startup Concepts.
            </h1>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-sm">
              Join an elite ecosystem of innovators, validate scalable propositions, and accelerate your development cycle.
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/80">
            {/* <span>Enterprise Grade Platform</span> */}
            {/* <span>v1.0.0</span> */}
          </div>
        </div>

        {/* Right Side: Authentication Form Formats */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header Text Block */}
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Enter your credentials to access your secure innovation repository.
              </p>
            </div>

            {/* Form Interface */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input Field Container */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Input Field Container */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                {/* Forgot Password Plain Text Below Input */}
                <div className="flex justify-end mt-1.5">
                  <span className="text-xs font-medium text-green-500 dark:text-green-500 select-none">
                    Forgot password?
                  </span>
                </div>
              </div>

              {/* Submit Button Component */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-medium text-sm rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Login to Account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Divider Element */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-400 dark:text-zinc-500 font-medium">
                  Or secure connection with
                </span>
              </div>
            </div>

            {/* Third-Party Authentication Service Provider (Google) */}
            <button
              type="button"
              className="w-full py-3 px-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-medium text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.99]"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            {/* Bottom Redirect Context */}
            <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              New to our platform?{' '}
              <a href="#register" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition-all">
                Create an account
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;