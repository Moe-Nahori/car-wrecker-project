import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import BlogPostTags from './BlogPostTags';

const BlogPostCard = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 sm:h-64 w-full bg-gray-200 dark:bg-gray-700">
          {!imageError ? (
            <img
              src={post.featuredImage || '/images/blog/default.jpg'}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-blue-50 dark:bg-blue-900/20">
              <span className="text-blue-600 dark:text-blue-400">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        {/* Meta info */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            {post.author}
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </Link>
        </h2>
        
        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {post.excerpt}
        </p>
        
        {/* Tags */}
        <BlogPostTags tags={post.tags} />
        
        {/* Read more link */}
        <div className="mt-4">
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Read more
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
