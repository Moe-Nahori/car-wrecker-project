import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

const RelatedPosts = ({ posts = [] }) => {
  if (!posts || posts.length === 0) return null;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-40 w-full">
                <img
                  src={post.featuredImage || '/images/blog/default.jpg'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            
            <div className="p-4">
              {/* Date */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar size={14} className="mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </Link>
              </h3>
              
              {/* Excerpt - limited to 2 lines */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              
              {/* Read more link */}
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Read more
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
