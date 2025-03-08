import React from 'react';
import Link from 'next/link';
import { Tag } from 'lucide-react';

const BlogPostTags = ({ tags = [], onClick = null }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size={16} className="text-blue-600 dark:text-blue-400" />
      {tags.map((tag) => (
        <div key={tag}>
          {onClick ? (
            <button
              onClick={() => onClick(tag)}
              className="px-2.5 py-0.5 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              {tag}
            </button>
          ) : (
            <Link
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-2.5 py-0.5 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              {tag}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogPostTags;
