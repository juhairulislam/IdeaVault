import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { 
  BiFolder, 
  BiChevronRight,
  BiCalendar,
  BiUser
} from 'react-icons/bi';

const IdeaCard = ({ idea }) => {
  const {
    _id,
    title,
    shortDescription,
    category,
    imageURL,
    author,
    authorAvatar,
    createdAt
  } = idea;

  // Format date with industry-standard professional localization configurations
  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Added';

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.12)] dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-emerald-500/30 dark:hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.08)]">
      
      {/* Visual Asset Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <Image
          src={imageURL || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          width={400}
          height={250}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
        
        {/* Category Context Tag */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-slate-900 shadow-sm backdrop-blur-md dark:bg-zinc-900/90 dark:text-emerald-400">
          <BiFolder className="text-emerald-500 dark:text-emerald-400" />
          {category}
        </span>
      </div>

      {/* Card Content Infrastructure */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Title and Short Narrative Wrap */}
        <div className="flex-1">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
            {title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            {shortDescription}
          </p>
        </div>

        {/* Dynamic Meta Matrix Boundary */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
          <div className="flex items-center justify-between gap-4">
            
            {/* Creator Profile Group */}
            <div className="flex items-center gap-2.5 min-w-0">
              {author.photoURL ? (
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-zinc-800">
                  <Image
                    src={author.photoURL}
                    alt={author.name || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                  <BiUser className="h-4 w-4" />
                </div>
              )}
              <div className="truncate text-xs">
                <p className="font-semibold text-slate-700 truncate dark:text-zinc-300">
                  {author.name || 'Anonymous Innovator'}
                </p>
              </div>
            </div>

            {/* Publication Timestamp Entity */}
            <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-500 dark:text-zinc-400">
              <BiCalendar className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              <span>{formattedDate}</span>
            </div>

          </div>
        </div>

        {/* Action Anchor Layer */}
        <div className="mt-5">
          <Link
            href={`/ideas/${_id}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 dark:focus:ring-offset-zinc-900"
          >
            View Details
            <BiChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </article>
  );
};

export default IdeaCard;