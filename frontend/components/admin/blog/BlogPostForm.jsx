import React, { useState } from 'react';
import { Image as ImageIcon, Tag, X } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import ImageUploader from './ImageUploader';

const BlogPostForm = ({ postData, onChange, saving, isEdit = false }) => {
  const [selectedTab, setSelectedTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      const newTags = [...postData.tags, tagInput.trim()];
      onChange('tags', newTags);
      setTagInput('');
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag) => {
    const newTags = postData.tags.filter(t => t !== tag);
    onChange('tags', newTags);
  };

  const handleImageUpload = (imageUrl) => {
    onChange('featuredImage', imageUrl);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex -mb-px">
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  selectedTab === 'content'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setSelectedTab('content')}
              >
                Content
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${
                  selectedTab === 'seo'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setSelectedTab('seo')}
              >
                SEO & Metadata
              </button>
            </div>
          </div>

          {/* Content Tab */}
          {selectedTab === 'content' && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={(e) => onChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter a compelling title..."
                  disabled={saving}
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <MarkdownEditor
                  content={postData.content}
                  onChange={(content) => onChange('content', content)}
                  previewMode={previewMode}
                  setPreviewMode={setPreviewMode}
                  disabled={saving}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={postData.excerpt}
                  onChange={(e) => onChange('excerpt', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Write a brief summary of your post (appears in search results and post previews)"
                  disabled={saving}
                />
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {selectedTab === 'seo' && (
            <div className="space-y-6">
              {/* URL Slug */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                    /blog/
                  </span>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={postData.slug}
                    onChange={(e) => onChange('slug', e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="your-post-slug"
                    disabled={saving}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  The URL slug is automatically generated from the title. You can modify it if needed.
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={postData.metaDescription || postData.excerpt}
                  onChange={(e) => onChange('metaDescription', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter a meta description for SEO purposes (defaults to excerpt if left empty)"
                  disabled={saving}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  If left empty, the excerpt will be used as the meta description.
                </p>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={handleTagKeyPress}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Add a tag and press Enter"
                    disabled={saving}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={saving || !tagInput.trim()}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <Tag size={16} />
                  </button>
                </div>
                
                {postData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postData.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          disabled={saving}
                          className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Author Info */}
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-md">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Author Information</h3>
            <div>
              <label htmlFor="author" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Author Name
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={postData.author}
                onChange={(e) => onChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your name"
                disabled={saving}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-md">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Featured Image</h3>
            <ImageUploader
              currentImage={postData.featuredImage}
              onImageUploaded={handleImageUpload}
              disabled={saving}
            />
          </div>

          {/* Publishing Info */}
          {isEdit && postData.publishedAt && (
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Publishing Information</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`${postData.status === 'published' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                    {postData.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </p>
                {postData.publishedAt && (
                  <p className="mt-1">
                    <strong>Published:</strong>{' '}
                    {new Date(postData.publishedAt).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Help & Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Tips for Writing Great Content</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>Use clear, concise headlines</li>
              <li>Include relevant images</li>
              <li>Break up text with subheadings</li>
              <li>Include customer benefits</li>
              <li>End with a clear call to action</li>
              <li>Aim for 800-1500 words for better SEO</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
