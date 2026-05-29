import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';

const MyInteractionsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const currentUserEmail = session?.user?.email;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        }
    );

    const allComments = res.ok ? await res.json() : [];


    const myComments = allComments.filter(
        (comment) => comment.userEmail === currentUserEmail
    );


    const sortedComments = myComments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <section className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/50 rounded-full px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Activity Log
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            My Interactions
                        </h1>

                        <p className="mt-3 text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                            Review your comments and contributions across startup ideas and discussions.
                        </p>
                    </div>

                    {/* Stats Counter */}
                    <div className="shrink-0 sm:self-end flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 shadow-sm backdrop-blur-sm min-w-[160px]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                                Total Comments
                            </p>
                            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-0.5">
                                {sortedComments.length}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {sortedComments.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 p-12 md:p-20 text-center backdrop-blur-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                            <svg
                                className="w-8 h-8 text-zinc-400 dark:text-zinc-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z"
                                />
                            </svg>
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
                            No interactions yet
                        </h3>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                            Start engaging with ideas to build your personal interaction history.
                        </p>
                    </div>
                ) : (
                    /* Comments List */
                    <div className="space-y-5">
                        {sortedComments.map((comment) => (
                            <div
                                key={comment._id}
                                className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5"
                            >
                                <div className="flex flex-col sm:flex-row items-start gap-4">

                                    {/* Avatar Section */}
                                    <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800 group-hover:ring-emerald-500/30 transition-all duration-300">
                                        <Image
                                            src={comment.userPhoto || '/default-avatar.png'}
                                            alt={comment.userName || 'User'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 min-w-0 w-full">

                                        {/* Top Meta Info */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
                                            <div className="min-w-0">
                                                {/* Highlighted Username */}
                                                <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                                    {comment.userName || 'Anonymous Innovator'}
                                                </h2>

                                                <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center gap-1">
                                                    <span>Commented on:</span>
                                                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 italic decoration-emerald-500/40 custom-underline">
                                                        "{comment.ideaTitle}"
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Right Actions & Date */}
                                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                                                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap order-2 sm:order-1">
                                                    {comment.createdAt
                                                        ? new Date(comment.createdAt).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }
                                                        )
                                                        : 'Recent'}
                                                </span>

                                                <Link
                                                    href={`/ideas/${comment.ideaId}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors order-1 sm:order-2 group/btn"
                                                >
                                                    View Idea
                                                    <svg
                                                        className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2.5"
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Actual Comment Text */}
                                        <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal break-words selection:bg-emerald-500/20">
                                            {comment.commentText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyInteractionsPage;