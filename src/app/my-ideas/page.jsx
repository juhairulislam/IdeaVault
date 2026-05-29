import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth'; 
import Image from 'next/image';
import IdeaCardActions from './IdeaCardActions';

const MyIdeasPage = async () => {

  const { token } = await auth.api.getToken({
    headers: await headers()
  });

  let myIdeas = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store' 
    });
    
    if (res.ok) {
      myIdeas = await res.json();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">My Ideas Dashboard</h1>

      {myIdeas.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-10">No ideas posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myIdeas.map((idea) => (
            <div key={idea._id} className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between transition-colors duration-300">
              
              <div>
                {idea.imageURL && (
                  <div className="w-full h-48 relative rounded-xl overflow-hidden mb-4 bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      width={400}
                      height={200}
                      src={idea?.imageURL}
                      alt={idea?.title || "Idea Image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {idea?.category && (
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-full mb-3">
                    {idea?.category}
                  </span>
                )}

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {idea?.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                  {idea?.shortDescription}
                </p>
              </div>


              <IdeaCardActions idea={idea} token={token} />
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;