"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6 py-12 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient Background Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-zinc-200/50 dark:bg-zinc-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 flex flex-col items-center">
        {/* 404 Badge */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-2xl blur-xl transition-all duration-500 group-hover:scale-110" />
          <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex items-center justify-center">
            <span className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-clip-text text-transparent select-none">
              404
            </span>
          </div>
        </div>

        {/* Simplified Project-Friendly Headings */}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl transition-colors duration-300">
          Page Not Found
        </h1>
        
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-md mx-auto transition-colors duration-300">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Clear Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => router.push('/')}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-sm shadow-emerald-600/10 transition-all duration-200 active:scale-[0.98]"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1/1 0 001 1h3m10-11l2 2m-2-2v10a1/1 0 01-1 1h-3m-6 0a1/1 0 001-1v-4a1/1 0 011-1h2a1/1 0 011 1v4a1/1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>

          <button
            onClick={() => router.back()}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-sm font-medium rounded-xl text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            Go Back
          </button>
        </div>

        {/* Clean System Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-900 w-full max-w-sm text-center">
          <p className="text-xs tracking-wider text-zinc-400 dark:text-zinc-600 uppercase font-semibold">
            Error Code: 404_ROUTE_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;