import React from 'react';
import IdeaCard from '@/components/IdeaCard';
import { BiCompass, BiArrowToRight } from 'react-icons/bi';
import { HiLightningBolt } from 'react-icons/hi';
import Link from 'next/link';

const fetchTrendingIdeas = async () => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/trending`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error('Data pipeline extraction failure');
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Trending engine exception context:', error);
        return [];
    }
};

const TrendingPage = async () => {
    const trendingIdeas = await fetchTrendingIdeas();

    return (
        <div className="min-h-screen bg-zinc-50 px-4 py-16 transition-colors duration-300 dark:bg-zinc-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">


                <header className="relative mb-16 flex flex-col items-center text-center">

                    <div className="absolute top-0 -z-10 h-32 w-72 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/5" />


                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-700 shadow-sm transition-all hover:bg-emerald-100/80 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20">
                        <HiLightningBolt className="h-3.5 w-3.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
                        <span className="tracking-wide">High-Engagement Ecosystem Index</span>
                    </div>


                    <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                        Trending Innovations
                    </h1>


                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Explore highly validated concepts backed by community interaction, real-time feedback volume, and scalable market viability parameters.
                    </p>





                    <div className="mt-12 h-[1px] w-full max-w-xl bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
                </header>

                {trendingIdeas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200/80 bg-white/50 py-20 text-center dark:border-zinc-800/80 dark:bg-zinc-900/20">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600">
                            <BiCompass className="h-6 w-6" />
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-200">
                            No trending metrics captured
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                            The analytical data engine could not identify any concepts passing our real-time engagement criteria threshold.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {trendingIdeas.map((idea) => (
                            <IdeaCard key={idea._id} idea={idea} />
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/ideas"
                        className="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/10 transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] dark:bg-emerald-500 dark:text-zinc-950 dark:shadow-none dark:hover:bg-emerald-400"
                    >
                        <span>Browse All Ideas</span>
                        <BiArrowToRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default TrendingPage;