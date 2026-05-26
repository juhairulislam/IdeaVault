'use client'
import { useSession } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddIdeaPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: session, isPending } = useSession();

    const user = session?.user;


    const onSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const newIdeaData = Object.fromEntries(formData.entries());

        const author = {
            name: user?.name || "Anonymous",
            email: user?.email || "No Email",
            photoURL: user?.image || "default-photo-url"
        };


        const finalData = {
            ...newIdeaData,
            author: author,
            createdAt: new Date().toISOString()
        };


        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });

        const data = await res.json();

        setIsSubmitting(false);
        toast.success('Add Idea Successfully');
        e.target.reset();
    };



    return (
        <div>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm p-6 sm:p-10 transition-colors duration-300">

                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            Publish New Innovation Concept
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Fill in the strategic parameters below to index your concept into the centralized validation repository.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>


                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Idea Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="e.g., Decentralized Supply Chain Integrity Ledger"
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* Grid Layout Container for Category and Budget */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    required
                                    defaultValue=""
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 appearance-none"
                                >
                                    <option value="" disabled>Select enterprise sector</option>
                                    <option value="Tech">Technology & SaaS</option>
                                    <option value="Health">Healthcare & Biotech</option>
                                    <option value="AI">Artificial Intelligence & ML</option>
                                    <option value="Education">EdTech & Infrastructure</option>
                                    <option value="Fintech">Financial Infrastructure</option>
                                </select>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Estimated Budget
                                </label>
                                <input
                                    type="text"
                                    name="estimatedBudget"
                                    required
                                    placeholder="e.g., $15,000 - $25,000"
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="imageURL"
                                    required
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Target Audience
                                </label>
                                <input
                                    type="text"
                                    name="targetAudience"
                                    required
                                    placeholder="e.g., Small Scale Logistics Operators"
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Short Description
                            </label>
                            <input
                                type="text"
                                name="shortDescription"
                                required
                                maxLength={120}
                                placeholder="High-level introductory tag phrase for structural index cards (Max 120 chars)"
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Problem Statement
                            </label>
                            <textarea
                                name="problemStatement"
                                required
                                rows={3}
                                placeholder="Explicit void or functional vulnerability noticed in the operational ecosystem..."
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Proposed Solution
                            </label>
                            <textarea
                                name="proposedSolution"
                                required
                                rows={3}
                                placeholder="Technical workflow pattern designed to address the problem statement statement..."
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Detailed Description
                            </label>
                            <textarea
                                name="detailedDescription"
                                required
                                rows={5}
                                placeholder="Exhaustive architectural detailing of the operational implementation roadmap..."
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
                            />
                        </div>


                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-zinc-950 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/10"
                            >
                                {isSubmitting ? 'Syncing Repository Pipeline...' : 'Deploy Innovation Document'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddIdeaPage;