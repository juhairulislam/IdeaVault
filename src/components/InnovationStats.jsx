import React from 'react';

const InnovationStats = () => {
  const stats = [
    { id: 1, value: "1,420+", label: "Ideas Generated", growth: "+24% this week" },
    { id: 2, value: "$4.2M", label: "Mock Capital Tracked", growth: "Community Valued" },
    { id: 3, value: "89%", label: "Validation Rate", growth: "Active feedback loops" },
    { id: 4, value: "48", label: "Launched Frameworks", growth: "Ready to scale" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
            Platform Metrics
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Hub for Next-Gen Solutions
          </p>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Real-time insights into how global innovators are shaping the decentralized market space.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                {stat.label}
              </dt>
              <dd className="mt-2 text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </dd>
              <dd className="mt-2 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded w-fit">
                {stat.growth}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationStats;