import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUploader = ({ currentImage, onImageUploaded, disabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentImage);

  // Handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadImage(e.dataTransfer.files[0]);
    }
  };

  // Upload image to server
  const uploadImage = async (file) => {
    // Only accept images
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, GIF)');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Reset error and start uploading
    setError('');
    setUploading(true);

    try {
      // Create a preview immediately
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('image', file);
      
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      // Send the file to the server
      const response = await fetch('/api/admin/blog/upload/image', {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        // Get response text and parse JSON
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid server response format');
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      // Pass the URL to the parent component
      if (data.url) {
        console.log('Image uploaded successfully, URL:', data.url);
        onImageUploaded(data.url);
        setError('');
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(`Failed to upload image: ${error.message}`);
      
      // Keep the preview if we have one
      if (previewUrl && !currentImage) {
        // Generate a temporary URL only if this is a new upload (not editing)
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const tempUrl = `/images/blog/temp-${timestamp}-${randomString}.jpg`;
        
        console.log('Using fallback temporary URL:', tempUrl);
        onImageUploaded(tempUrl);
      }
    } finally {
      setUploading(false);
    }
  };

  // Remove current image
  const handleRemoveImage = () => {
    setPreviewUrl('');
    onImageUploaded('');
    setError('');
  };

  // Display either the current image from props or the preview
  const displayImage = previewUrl || currentImage;

  return (
    <div>
      {displayImage ? (
        <div className="relative">
          <img 
            src={displayImage} 
            alt="Featured" 
            className="w-full h-40 object-cover rounded-md" 
            onError={(e) => {
              console.error('Image load error:', e);
              setError('Failed to load image preview');
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={disabled || uploading}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-4 text-center ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : (
              <>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                  <Upload size={20} className="text-gray-500 dark:text-gray-400" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Drag & drop an image here, or{' '}
                  <label className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={disabled || uploading}
                    />
                  </label>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG or GIF, up to 5MB
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;