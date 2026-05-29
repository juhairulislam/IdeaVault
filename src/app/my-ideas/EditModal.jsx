'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditModal = ({ idea, token, onClose }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);


  if (!idea) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updatedIdeaData = Object.fromEntries(formData.entries());

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${idea._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedIdeaData)
      });

      if (res.ok) {
        toast.success('Idea Updated Successfully');
        onClose();
        router.refresh(); 
      } else {
        toast.error('Failed to update idea');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl my-8 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xl p-6 sm:p-10 transition-colors duration-300 max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Update Innovation Concept
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Modify the parameters below to re-index your concept in the repository.
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Idea Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={idea.title}
              placeholder="e.g., Decentralized Supply Chain Integrity Ledger"
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Category
              </label>
              <select
                name="category"
                required
                defaultValue={idea.category || ""}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
              >
                <option value="" disabled>Select enterprise sector</option>
                <option value="Tech">Technology & SaaS</option>
                <option value="Health">Healthcare & Biotech</option>
                <option value="AI">Artificial Intelligence & ML</option>
                <option value="Education">EdTech & Infrastructure</option>
                <option value="Fintech">Financial Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Estimated Budget
              </label>
              <input
                type="text"
                name="estimatedBudget"
                required
                defaultValue={idea.estimatedBudget}
                placeholder="e.g., $15,000 - $25,000"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Grid: Image URL & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="imageURL"
                required
                defaultValue={idea.imageURL}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                required
                defaultValue={idea.targetAudience}
                placeholder="e.g., Small Scale Logistics Operators"
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              required
              maxLength={120}
              defaultValue={idea.shortDescription}
              placeholder="High-level introductory tag phrase..."
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
            />
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Problem Statement
            </label>
            <textarea
              name="problemStatement"
              required
              rows={3}
              defaultValue={idea.problemStatement}
              placeholder="Explicit void noticed in the ecosystem..."
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
            />
          </div>

          {/* Proposed Solution */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Proposed Solution
            </label>
            <textarea
              name="proposedSolution"
              required
              rows={3}
              defaultValue={idea.proposedSolution}
              placeholder="Technical workflow pattern designed..."
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Detailed Description
            </label>
            <textarea
              name="detailedDescription"
              required
              rows={4}
              defaultValue={idea.detailedDescription}
              placeholder="Exhaustive architectural detailing..."
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-950"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-zinc-950 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Syncing Repository Pipeline...' : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditModal;