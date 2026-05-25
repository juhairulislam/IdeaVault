import Image from 'next/image';
import React from 'react';
import { 
  HiChevronRight, 
  HiOutlineExclamationTriangle, 
  HiOutlineLightBulb, 
  HiOutlineUsers, 
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays
} from 'react-icons/hi2';
import { BiCategory } from 'react-icons/bi';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const fetchSingleIdeas = async (id , token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,{
    headers:{
      authorization : token || "" 
    }
  });
  const data = await res.json();
  return data || {};
};

const IdeaDetailsPage = async ({ params }) => {


     const{ token} =   await auth.api.getToken({
      
        headers: await headers() 
    });


  const { ideasId } = await params;
  const ideas = await fetchSingleIdeas(ideasId , token);



  const { 
    _id, 
    title, 
    shortDescription, 
    detailedDescription, 
    category, 
    tags = [], 
    imageURL, 
    estimatedBudget, 
    targetAudience, 
    problemStatement, 
    proposedSolution, 
    createdAt, 
    author 
  } = ideas;

  const authorName = author?.name || 'Anonymous Innovator';
  const authorEmail = author?.email || 'hidden@ideavault.io';
  const authorPhoto = author?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });





  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Structural Inner Content Wrapper */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Navigation Breadcrumb Context Track */}
        <div className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-zinc-400">
          <span className="hover:text-slate-700 dark:hover:text-zinc-200 transition-colors cursor-pointer">Innovations</span>
          <HiChevronRight className="h-4 w-4 text-slate-400" />
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/30">
            <BiCategory className="h-3.5 w-3.5" />
            {category}
          </span>
        </div>

        {/* Core Layout Grid System */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main Information Panels (Left Column) */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Concept Identity Hero Segment */}
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:from-emerald-950/40 dark:to-teal-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm">
                {category}
              </span>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                {title}
              </h1>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-zinc-300 font-normal border-l-2 border-emerald-500 pl-4 py-1">
                {shortDescription}
              </p>
            </div>

            {/* Strategic Banner Aspect Container Block */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-md dark:border-zinc-800/80 dark:bg-zinc-900 aspect-video max-h-[460px] group">
              <Image
                width={800}
                height={450}
                src={imageURL}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="eager"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Twin Concept Architecture Splitting Structure */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              {/* Problem Statement Focus Unit */}
              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 shadow-sm">
                    <HiOutlineExclamationTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight">Problem Statement</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  {problemStatement}
                </p>
              </div>

              {/* Proposed Technical Solution Focus Unit */}
              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/40 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
                    <HiOutlineLightBulb className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white tracking-tight">Proposed Solution</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  {proposedSolution}
                </p>
              </div>

            </div>

            {/* Complex Detailed Architectural Breakdown Text Panel */}
            <div className="space-y-5 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                Detailed Implementation Overview
              </h3>
              <div className="h-px bg-slate-100 dark:bg-zinc-800/60" />
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-zinc-300 font-normal">
                {detailedDescription}
              </p>
            </div>

          </div>

          {/* Operational Metrics Side Deck Panels (Right Column) */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Author Social Proof Anchor Panel */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-4">
                Concept Owner
              </h4>
              <div className="flex items-center gap-4">
                {/* Profile Image Node with High-Contrast Framing */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-emerald-500/10 dark:ring-emerald-400/20 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={authorPhoto}
                    alt={authorName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold text-slate-950 dark:text-white tracking-tight">
                    {authorName}
                  </p>
                  <p className="truncate text-xs font-medium text-slate-500 dark:text-zinc-400">
                    {authorEmail}
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <HiOutlineCalendarDays className="h-4 w-4 text-slate-400" />
                  Published Context
                </span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{formattedDate}</span>
              </div>
            </div>

            {/* Target Audience & Budget Metric Metadata Block */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-sm space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                Project Operational Framework
              </h4>
              
              {/* Metric Item Line: Target Market */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-100 dark:border-zinc-700/50 shadow-sm">
                  <HiOutlineUsers className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 dark:text-zinc-500">Target Audience</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 mt-0.5">{targetAudience}</p>
                </div>
              </div>

              {/* Metric Item Line: Budget limits */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-100 dark:border-zinc-700/50 shadow-sm">
                  <HiOutlineCurrencyDollar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 dark:text-zinc-500">Estimated Capital Budget</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 mt-0.5">{estimatedBudget}</p>
                </div>
              </div>
            </div>

            {/* Dynamic System Vector Tags Component Panel */}
            {tags.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-3.5">
                  Indexed Classifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 dark:bg-zinc-800 dark:border-zinc-700/50 dark:text-zinc-300 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 dark:hover:border-emerald-900/30 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
};

export default IdeaDetailsPage;