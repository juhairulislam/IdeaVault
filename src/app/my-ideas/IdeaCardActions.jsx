'use client';

import React, { useState } from 'react';
import DeleteButton from './DeleteButton';
import EditModal from './EditModal';

const IdeaCardActions = ({ idea, token }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3">

        <button
          onClick={() => setIsEditOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
        >
          Edit
        </button>


        <DeleteButton ideaId={idea._id} token={token} />
      </div>


      {isEditOpen && (
        <EditModal 
          idea={idea} 
          token={token} 
          onClose={() => setIsEditOpen(false)} 
        />
      )}
    </>
  );
};

export default IdeaCardActions;