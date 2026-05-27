'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { HiOutlineTrash, HiOutlinePencilSquare, HiPaperAirplane } from 'react-icons/hi2';

const CommentSection = ({ ideaId, token, currentEmail }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ideaId) {
      fetchComments();
    }
  }, [ideaId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Could not load comments');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Comment text cannot be empty');
      return;
    }

    if (!token) {
      toast.error('Please log in to leave a comment');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ideaId,
          commentText: newComment.trim()
        })
      });

      if (res.ok) {
        setNewComment('');
        toast.success('Comment posted successfully');
        fetchComments();
      } else {
        const errData = await res.json();
        toast.error(errData.message || 'Failed to post comment');
      }
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) {
      toast.error('Comment content cannot be empty');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          commentText: editingText.trim()
        })
      });

      if (res.ok) {
        setEditingCommentId(null);
        setEditingText('');
        toast.success('Comment updated successfully');
        fetchComments();
      } else {
        const errData = await res.json();
        toast.error(errData.message || 'Unauthorized action');
      }
    } catch (error) {
      toast.error('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        toast.success('Comment deleted');
        fetchComments();
      } else {
        const errData = await res.json();
        toast.error(errData.message || 'Could not delete comment');
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    }
  };

  return (
    <div className="mt-12 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/40 backdrop-blur-sm">
      <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-6">
        Discussion Forum ({comments.length})
      </h3>

      <form onSubmit={handleAddComment} className="mb-8 flex gap-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your feedback or questions..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-emerald-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
        >
          <HiPaperAirplane className="h-4 w-4" />
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-zinc-400 text-center py-4">
            No dynamic comments yet. Start the thread!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 border-b border-slate-100 dark:border-zinc-800/50 pb-5 last:border-0 last:pb-0"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                <Image
                  src={comment.userPhoto && comment.userPhoto.trim() !== "" ? comment.userPhoto : 'https://images.unsplash.com/photo-1740252117044-2af197eea287'}
                  alt={comment.userName && comment.userName.trim() !== "" ? comment.userName : 'User profile'}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {comment.userName}
                    </span>
                    <span className="ml-3 text-xs text-slate-400 dark:text-zinc-500">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {currentEmail === comment.userEmail && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditingText(comment.commentText);
                        }}
                        className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                        title="Edit Comment"
                      >
                        <HiOutlinePencilSquare className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Comment"
                      >
                        <HiOutlineTrash className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId === comment._id ? (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-900 focus:border-emerald-500"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleUpdateComment(comment._id)}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditingText('');
                        }}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-slate-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
                    {comment.commentText}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;