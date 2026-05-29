'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const DeleteButton = ({ ideaId, token }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        toast.success('Idea deleted successfully');
        setIsOpen(false); 
        router.refresh(); 
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
      >
        Delete
      </button>


      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md scale-100 rounded-2xl bg-white p-6 shadow-xl border border-slate-100 transition-all">
            <h3 className="text-lg font-bold text-slate-950">
              Delete Innovation Idea
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Are you absolutely sure you want to delete this idea? This action cannot be undone and all data will be permanently removed.
            </p>


            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;