import React, { useState, useEffect } from 'react';
import { X, Save, Image, AlertCircle } from 'lucide-react';
import { BlogPost, createBlogPost, updateBlogPost } from '../../services/blogService';
import ReactMarkdown from 'react-markdown';

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: (postSaved?: boolean) => void;
}

export default function BlogEditor({ post, onClose }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    imageUrl: '',
    readTime: '',
    published: false
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load post data when editing
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        author: post.author || '',
        imageUrl: post.imageUrl || '',
        readTime: post.readTime || '',
        published: post.published || false
      });
    }
  }, [post]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!formData.readTime.trim()) newErrors.readTime = 'Read time is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSaveError(null);
    
    try {
      // Format date in the format "Mar 15, 2024"
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      if (post) {
        // Update existing post
        await updateBlogPost(post.id, {
          ...formData,
          date: post.date || formattedDate
        });
      } else {
        // Create new post
        await createBlogPost({
          ...formData,
          date: formattedDate
        });
      }
      
      onClose(true); // Pass true to indicate a post was saved
    } catch (error) {
      console.error('Error saving blog post:', error);
      setSaveError('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {post ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <button
              onClick={() => onClose(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {saveError && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {saveError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange(e, 'title')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt (Brief summary that appears in the card)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange(e, 'excerpt')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
              />
              {errors.excerpt && <div className="text-red-500 text-sm mt-1">{errors.excerpt}</div>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Content (Markdown Supported)
                </label>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
              </div>
              
              {previewMode ? (
                <div className="border rounded-lg p-4 min-h-[300px] prose max-w-none">
                  <ReactMarkdown>{formData.content}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange(e, 'content')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={12}
                />
              )}
              {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange(e, 'author')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.author ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Read Time (e.g., "5 min")
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange(e, 'readTime')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.readTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.readTime && <div className="text-red-500 text-sm mt-1">{errors.readTime}</div>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange(e, 'imageUrl')}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Image className="w-5 h-5 mr-2" />
                  Browse
                </button>
              </div>
              {errors.imageUrl && <div className="text-red-500 text-sm mt-1">{errors.imageUrl}</div>}
              {formData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="h-40 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="publishPost"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="publishPost" className="ml-2 block text-sm text-gray-900">
                Publish this post (make it visible on the website)
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
                disabled={isSubmitting}
              >
                <Save className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}