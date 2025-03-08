import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { getCompanyName } from '@/utils/config';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const companyName = getCompanyName();

  useEffect(() => {
    fetchBlogPosts();
  }, [currentTag]);

  const fetchBlogPosts = async () => {
    try {
      // In a real implementation, this would fetch from an API
      let url = '/api/blog/posts';
      if (currentTag) {
        url += `?tag=${currentTag}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data = await response.json();
      setBlogPosts(data);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      
      // For development, we'll use sample data
      setBlogPosts([
        {
          id: '1',
          title: 'Understanding the Value of Your Old Car',
          slug: 'understanding-car-value',
          excerpt: 'Learn about the factors that determine your car\'s value and how to get the best price for your old vehicle.',
          content: '# Understanding the Value of Your Old Car\n\nWhen it comes to selling your old car, understanding its value is crucial...',
          author: 'Jane Smith',
          publishedAt: '2025-02-15T10:30:00Z',
          featuredImage: '/images/blog/car-value.jpg',
          tags: ['car valuation', 'selling tips']
        },
        {
          id: '2',
          title: 'The Environmental Impact of Car Recycling',
          slug: 'environmental-impact-car-recycling',
          excerpt: 'Discover how proper car recycling helps reduce environmental pollution and conserve valuable resources.',
          content: '# The Environmental Impact of Car Recycling\n\nCar recycling is one of the most environmentally beneficial...',
          author: 'John Doe',
          publishedAt: '2025-02-05T14:45:00Z',
          featuredImage: '/images/blog/car-recycling.jpg',
          tags: ['recycling', 'environment']
        },
        {
          id: '3',
          title: 'What Happens to Your Car at a Wrecker',
          slug: 'what-happens-at-car-wrecker',
          excerpt: 'A step-by-step guide to the process your car goes through at a professional car wrecker facility.',
          content: '# What Happens to Your Car at a Wrecker\n\nMany car owners are curious about what happens to their vehicles...',
          author: 'Alex Johnson',
          publishedAt: '2025-01-20T09:15:00Z',
          featuredImage: '/images/blog/car-wrecker-process.jpg',
          tags: ['car wrecking', 'recycling']
        },
        {
          id: '4',
          title: 'How to Get the Best Price for Your Unwanted Vehicle',
          slug: 'best-price-unwanted-vehicle',
          excerpt: 'Expert tips to ensure you get top dollar for your unwanted car, even if it\'s no longer running.',
          content: '# How to Get the Best Price for Your Unwanted Vehicle\n\nSelling an unwanted vehicle can be a great way to...',
          author: 'Sarah Williams',
          publishedAt: '2025-01-10T16:30:00Z',
          featuredImage: '/images/blog/selling-car.jpg',
          tags: ['selling tips', 'negotiation']
        }
      ].filter(post => !currentTag || post.tags.includes(currentTag)));
      
      setLoading(false);
    }
  };

  const handleTagClick = (tag) => {
    setCurrentTag(tag === currentTag ? '' : tag);
  };

  // Extract all unique tags from posts
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags || []))];

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
    <>
      <Head>
        <title>Blog | {companyName}</title>
        <meta 
          name="description" 
          content={`Read the latest articles about car wrecking, recycling, and valuation from ${companyName}.`} 
        />
      </Head>
      
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <span className="text-gray-700 dark:text-gray-300">Blog</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Latest insights about car wrecking, recycling, and valuation
            </p>
            
            {currentTag && (
              <div className="mt-4 flex items-center">
                <span className="mr-2 text-gray-600 dark:text-gray-400">
                  Showing posts tagged with:
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {currentTag}
                  <button
                    onClick={() => setCurrentTag('')}
                    className="ml-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <X size={14} />
                  </button>
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* Main content - blog posts */}
            <div className="lg:col-span-5">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : blogPosts.length > 0 ? (
                <div className="space-y-8">
                  {blogPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    No blog posts found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTag 
                      ? `No posts found with the tag "${currentTag}". Try selecting a different tag.`
                      : 'Check back soon for new articles!'}
                  </p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <BlogSidebar 
                tags={allTags} 
                currentTag={currentTag} 
                onTagClick={handleTagClick} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
