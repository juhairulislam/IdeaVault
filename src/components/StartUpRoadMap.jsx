import React from 'react';

const StartupRoadmap = () => {
  const steps = [
    {
      phase: "01",
      title: "Deploy Concept",
      description: "Submit your raw foundational idea into the public ecosystem with targeted market domains.",
    },
    {
      phase: "02",
      title: "Crowd Validation",
      description: "Gather structural reviews, iteration metrics, and architectural commentary from global creators.",
    },
    {
      phase: "03",
      title: "Iterative Optimization",
      description: "Refine problem statements and solution structures based on contextual real-world feedback loops.",
    },
    {
      phase: "04",
      title: "Scale Framework",
      description: "Transition your conceptual vision into an executable portfolio-grade blueprint ready for market entry.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
            Execution Flow
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Blueprint to Reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-slate-200 dark:bg-slate-800 z-0 -translate-x-4 group-hover:bg-emerald-500 transition-colors duration-300" />
              )}
              
              <div className="relative z-10 flex flex-col items-start p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300 hover:border-emerald-500/50">
                <span className="text-4xl font-black text-emerald-100 dark:text-slate-800 transition-colors duration-300 group-hover:text-emerald-500/20">
                  {step.phase}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartupRoadmap;