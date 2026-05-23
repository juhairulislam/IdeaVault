import React from 'react';

const TopInnovators = () => {
  const innovators = [
    {
      rank: "01",
      name: "Alex Rivera",
      role: "SaaS Architect",
      ideas: 14,
      points: 2450,
      badge: "Alpha Thinker",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: "02",
      name: "Marcus Vance",
      role: "AI Researcher",
      ideas: 9,
      points: 1980,
      badge: "Tech Pioneer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      rank: "03",
      name: "Sophia Chen",
      role: "Product Designer",
      ideas: 11,
      points: 1820,
      badge: "UX Guru",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Context Banner */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <h2 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
              Ecosystem Leaders
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
              Top Platform Innovators
            </p>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Meet the active minds driving high-impact solutions, validating architectural blueprints, and earning top community validation scores.
            </p>
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 hidden lg:block">
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>Updated in real-time based on impact score</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unique Row-Based Interactive Showcase */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {innovators.map((person) => (
              <div
                key={person.rank}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:border-emerald-500/40 hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
              >
                {/* Left side: Rank & Profile Info */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-sm font-black text-slate-400 dark:text-slate-600 tracking-wider group-hover:text-emerald-500 transition-colors duration-300 w-6">
                    {person.rank}
                  </span>
                  
                  <div className="relative flex-shrink-0">
                    <img
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-800 group-hover:ring-emerald-500/60 transition-all duration-300"
                      src={person.avatar}
                      alt={person.name}
                    />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {person.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                      {person.role}
                    </p>
                  </div>
                </div>

                {/* Right side: Stats & Badges */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800/60">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                    {person.badge}
                  </span>
                  
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{person.ideas}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Ideas</p>
                    </div>
                    <div className="min-w-[70px]">
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+{person.points}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Impact</p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopInnovators;