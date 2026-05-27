'use client'
import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import ProfileUpdateModal from '@/components/ProfileUpdateModal';

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Structural Safeguard: Render clean premium skeleton during authentication resolution
  if (isPending) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-8 space-y-6 animate-pulse">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="flex-1 space-y-3 w-full">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            </div>
          </div>
          <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full" />
          <div className="space-y-4">
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Defensive Assignments: Block structural crashes if properties settle as null
  const user = session?.user;
  const name = user?.name || 'Anonymous Innovator';
  const email = user?.email || 'no-email@ideavault.io';
  const avatarUrl = user?.image || null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumb Header Hierarchy */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
            Account Workspace
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your credentials, platform identity, and security authorization nodes.
          </p>
        </div>

        {/* Premium Core Metadata Card Wrapper */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
          
          {/* Aesthetic Emerald Hero Backdrop Section */}
          <div className="h-32 w-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 border-b border-zinc-100 dark:border-zinc-800/50 flex items-end p-6">
          
          </div>

          <div className="px-6 pb-8 sm:px-8 sm:pb-10 relative">
            
            {/* User Profile Avatar Frame Alignment */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 mb-6">
              {avatarUrl ? (
                <Image
                width={100}
                height={100}
                  src={avatarUrl}
                  alt={name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-zinc-900 bg-zinc-100 dark:bg-zinc-800 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-3xl flex items-center justify-center ring-4 ring-white dark:ring-zinc-900 shadow-md">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {name}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  {email}
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800 my-6" />

            {/* Profile Strategic Content Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-900/50">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Full Display Name
                </span>
                <span className="text-sm font-medium mt-1 block text-zinc-800 dark:text-zinc-200">
                  {name}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-900/50">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Registered Destination Email Address
                </span>
                <span className="text-sm font-medium mt-1 block text-zinc-800 dark:text-zinc-200">
                  {email}
                </span>
              </div>
            </div>

            {/* Account Dashboard Execution Segment */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                Update Profile
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Synchronous Interactive Modal Layer Hook */}
      <ProfileUpdateModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentName={name}
      />
    </div>
  );
};

export default ProfilePage;