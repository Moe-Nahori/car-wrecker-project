import React from 'react';
import Link from 'next/link';
import { Tag, Search, ArrowUpRight } from 'lucide-react';

const BlogSidebar = ({ tags = [], currentTag = '', onTagClick = null }) => {
  // Process tags to ensure uniqueness
  const uniqueTags = Array.isArray(tags) ? [...new Set(tags)] : [];

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Search
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search blog..."
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Search 
            size={18} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
        </div>
      </div>
      
      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Tag size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <div key={tag}>
                {onTagClick ? (
                  <button
                    onClick={() => onTagClick(tag)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      currentTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                    }`}
                  >
                    {tag}
                  </button>
                ) : (
                  <Link
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    {tag}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Quick Quote CTA */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-medium mb-3">
          Need a Car Valuation?
        </h3>
        <p className="text-blue-100 mb-4">
          Get an instant quote for your unwanted vehicle in just a few clicks.
        </p>
        <Link 
          href="/quote" 
          className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition-colors font-medium"
        >
          Get Your Quote
          <ArrowUpRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {/* Contact Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Have Questions?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our team is ready to assist you with any inquiries.
        </p>
        <Link 
          href="/contact" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center"
        >
          Contact Us
          <ArrowUpRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogSidebar;
