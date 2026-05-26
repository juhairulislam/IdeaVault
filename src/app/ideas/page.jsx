import React from 'react';
import IdeaCard from '@/components/IdeaCard';
import Form from 'next/form';
import { BiLayer, BiSearchAlt, BiFilterAlt } from 'react-icons/bi';
import CategorySelect from '@/components/CategorySelect'; 


export const metadata = {
  title: "IdeaVault | All Ideas",
  description: "This is All Idea page of IdeaVault",
};

const fetchIdeas = async (searchQuery) => {
  const url = searchQuery 
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?search=${encodeURIComponent(searchQuery)}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];

  const data = await res.json();
  return data || [];
};

const IdeasPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search || '';
  const selectedCategory = resolvedParams?.category || '';

  const rawIdeas = await fetchIdeas(searchQuery);

  const filteredIdeas = selectedCategory
    ? rawIdeas.filter((idea) => idea?.category?.toLowerCase() === selectedCategory.toLowerCase())
    : rawIdeas;

  const categories = Array.from(
    new Set(rawIdeas.map((idea) => idea?.category).filter(Boolean))
  );

  return (
    <div className="min-h-screen bg-zinc-50/50 px-4 py-12 transition-colors duration-300 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <BiLayer className="h-3.5 w-3.5" />
              Innovation Vault System
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Explore Startup Ideas
            </h1>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              Discover innovative concepts, share your feedback, and collaborate on the next big breakthrough.
            </p>
          </div>

          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-500">
            Active Innovations: <span className="font-semibold text-zinc-900 dark:text-zinc-200">{filteredIdeas.length}</span>
          </div>
        </header>

        <Form action="" className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative sm:col-span-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSearchAlt className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            </span>
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search startup concepts by title..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-zinc-800/80 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-zinc-400 dark:placeholder-zinc-500"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiFilterAlt className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            </span>
            

            <CategorySelect categories={categories} selectedCategory={selectedCategory} />

            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none border-l border-zinc-200 dark:border-zinc-800 ml-2 pl-2">
              <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </Form>


        {filteredIdeas.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 py-20 text-center dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/20">
            <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 mb-4">
              <BiSearchAlt className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200">No innovations match criteria</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              The query matrix returned zero matching active documents. Try adjusting your keyphrases or resetting categories.
            </p>
          </div>
        ) : (

<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default IdeasPage;