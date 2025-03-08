import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, ChevronLeft, Calendar, User, Eye } from 'lucide-react';
import { getCompanyName } from '@/utils/config';

const BlogAdminPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const companyName = getCompanyName();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll use mock data
      const response = await fetch('/api/admin/blog/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // For development, we'll use sample data if the API fails
      setBlogPosts([
        {
          id: '1',
          title: 'Understanding the Value of Your Old Car',
          slug: 'understanding-car-value',
          excerpt: 'Learn about the factors that determine your car\'s value and how to get the best price.',
          author: 'Jane Smith',
          publishedAt: '2025-02-15T10:30:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-value.jpg',
        },
        {
          id: '2',
          title: 'The Environmental Impact of Car Recycling',
          slug: 'environmental-impact-car-recycling',
          excerpt: 'Discover how proper car recycling helps reduce environmental pollution and conserve resources.',
          author: 'John Doe',
          publishedAt: '2025-02-05T14:45:00Z',
          status: 'published',
          featuredImage: '/images/blog/car-recycling.jpg',
        },
        {
          id: '3',
          title: 'What Happens to Your Car at a Wrecker',
          slug: 'what-happens-at-car-wrecker',
          excerpt: 'A step-by-step guide to the process your car goes through at a professional car wrecker.',
          author: 'Jane Smith',
          publishedAt: null,
          status: 'draft',
          featuredImage: '/images/blog/car-wrecker-process.jpg',
        }
      ]);
      setError('Could not connect to blog service. Showing sample data.');
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        // In a real implementation, this would call an API
        const response = await fetch(`/api/admin/blog/posts/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete blog post');
        }
        
        // Update the local state by filtering out the deleted post
        setBlogPosts(blogPosts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting blog post:', error);
        // For development, we'll just remove it from state
        setBlogPosts(blogPosts.filter(post => post.id !== id));
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
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
        <title>Blog Management | {companyName} Admin</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Admin Dashboard
          </Link>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Blog Management
            </h1>
            <Link href="/admin/blog/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <PlusCircle size={16} className="mr-2" />
              Create New Blog Post
            </Link>
          </div>
          
          {error && (
            <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-md">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Published Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {post.excerpt}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <User size={14} className="mr-1" />
                            {post.author}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(post.publishedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {post.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {post.status === 'published' && (
                              <Link href={`/blog/${post.slug}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" title="View">
                                <Eye size={18} />
                              </Link>
                            )}
                            <Link href={`/admin/blog/edit/${post.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="Edit">
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogAdminPage;
