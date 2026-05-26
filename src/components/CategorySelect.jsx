'use client';
import React from 'react';

const CategorySelect = ({ categories, selectedCategory }) => {
  return (
    <select
      name="category"
      defaultValue={selectedCategory}
      onChange={(e) => e.target.form.requestSubmit()}
      className="w-full pl-9 pr-10 py-2.5 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl border border-zinc-200 dark:border-zinc-800/80 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat.toLowerCase()}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;