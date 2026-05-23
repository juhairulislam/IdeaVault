import React from 'react';
import { 
  BiFolder, 
  BiTargetLock, 
  BiErrorCircle, 
  BiCheckCircle, 
  BiChevronRight,
  BiTrendingUp
} from 'react-icons/bi';

const IdeaCard = ({ idea }) => {
  const {
    title,
    shortDescription,
    category,
    imageURL,
    targetAudience,
    problemStatement,
    proposedSolution
  } = idea;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.12)] dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-emerald-500/30 dark:hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.08)]">
      {/* Visual Asset Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <img
          src={imageURL || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-slate-900 shadow-sm backdrop-blur-md dark:bg-zinc-900/90 dark:text-emerald-400">
          <BiFolder className="text-emerald-500 dark:text-emerald-400" />
          {category}
        </span>
      </div>

      {/* Narrative Context Layout */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title and Short Overview */}
        <div className="flex-1">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
            {title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            {shortDescription}
          </p>

          {/* Separation Boundary */}
          <hr className="my-4 border-slate-100 dark:border-zinc-800" />

          {/* Metadata Matrices Grid */}
          <div className="space-y-3">
            {/* Target Audience */}
            <div className="flex items-start gap-2.5">
              <BiTargetLock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
              <div className="text-xs">
                <span className="font-semibold text-slate-700 dark:text-zinc-300">Audience: </span>
                <span className="text-slate-600 dark:text-zinc-400 line-clamp-1">{targetAudience}</span>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="flex items-start gap-2.5">
              <BiErrorCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500 dark:text-amber-400" />
              <div className="text-xs">
                <span className="font-semibold text-slate-700 dark:text-zinc-300">Problem: </span>
                <span className="text-slate-600 dark:text-zinc-400 line-clamp-1">{problemStatement}</span>
              </div>
            </div>

            {/* Proposed Solution */}
            <div className="flex items-start gap-2.5">
              <BiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
              <div className="text-xs">
                <span className="font-semibold text-slate-700 dark:text-zinc-300">Solution: </span>
                <span className="text-slate-600 dark:text-zinc-400 line-clamp-1">{proposedSolution}</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Interactive CTA Anchor */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-emerald-600 hover:text-white dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:bg-emerald-500 dark:hover:text-zinc-950">
            Explore Concept Blueprint
            <BiChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default IdeaCard;