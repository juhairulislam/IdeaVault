import React from 'react';
import IdeaCard from '@/components/IdeaCard';
import { BiLayer, BiSearchAlt } from 'react-icons/bi';

const fetchIdeas = async () => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/ideas`, {
            next: { revalidate: 60 } // Next.js performance data revalidation rule
        });

        if (!res.ok) throw new Error('Failed to fetch ideas portfolio data');
        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Data pipeline exception context:', error);
        return [];
    }
};

const IdeasPage = async () => {
    const ideas = await fetchIdeas();

    return (
        <div className="min-h-screen bg-slate-50/50 px-4 py-12 transition-colors duration-300 dark:bg-zinc-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Dynamic Context Header Section */}
                <header className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-slate-200/60 pb-8 dark:border-zinc-800/60 md:flex-row md:items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <BiLayer className="h-3.5 w-3.5" />
                            Innovation Vault System
                        </div>
                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
                            Explore Startup Ideas            </h1>
                        <p className="mt-2 text-base text-slate-600 dark:text-zinc-400">
                            Discover innovative concepts, share your feedback, and collaborate on the next big breakthrough.                        </p>
                    </div>

                    {/* Informative Counter Metric Element */}
                    <div className="text-sm font-medium text-slate-500 dark:text-zinc-500">
                        Showing <span className="font-semibold text-slate-900 dark:text-zinc-200">{ideas.length}</span> verified pipelines
                    </div>
                </header>

                {/* Fallback Display Layer for Empty States */}
                {ideas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center dark:border-zinc-800">
                        <BiSearchAlt className="h-12 w-12 text-slate-400 dark:text-zinc-600" />
                        <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-zinc-200">No ideation metrics recorded</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">The current target database context contains zero active documents.</p>
                    </div>
                ) : (
                    /* Multi-Column Responsive Grid Core Layer */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {ideas.map((idea) => (
                            <IdeaCard key={idea._id || idea.title} idea={idea} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default IdeasPage;