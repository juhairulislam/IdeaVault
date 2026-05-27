'use client'
import { authClient, useSession } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const ProfileUpdateModal = ({ isOpen, onClose, currentName }) => {
  

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const image = e.target.image.value;

        try {
            await authClient.updateUser({ name, image });
                        toast.success("Profile Update Successful!");

            onClose(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
            />

            <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Edit Profile Details
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                            Update Name
                        </label>
                        <input
                            required
                            name="name"
                            type="text"
                            placeholder={currentName}
                            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 placeholder-zinc-400 dark:placeholder-zinc-600 transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                            Profile Image URL
                        </label>
                        <input
                            required
                            name="image"
                            type="text"
                            placeholder="e.g., https://example.com/photo.png"
                            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 placeholder-zinc-400 dark:placeholder-zinc-600 transition-all duration-200"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                        <button
                            onClick={onClose}
                            type="button"
                            className="px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl active:scale-[0.98] transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-xl shadow-sm transition-all duration-200"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdateModal;