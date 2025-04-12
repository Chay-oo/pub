import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Edit, Trash2, AlertCircle, CheckCircle, Clock, Eye, EyeOff } from 'lucide-react';
import BlogEditor from '../components/blog/BlogEditor';
import { getAllBlogPosts, deleteBlogPost, togglePublishBlogPost, BlogPost } from '../services/blogService';
import { isAuthenticated, isAdmin, signOut } from '../lib/auth';

export default function BlogManagement() {
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
          navigate('/admin/login');
          return;
        }

        const adminUser = await isAdmin();
        if (!adminUser) {
          await signOut();
          navigate('/admin/login');
          return;
        }

        setAuthChecking(false);
        fetchBlogPosts();
      } catch (err) {
        console.error('Auth check error:', err);
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch blog posts on component mount
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await getAllBlogPosts(false); // Get all posts, not just published ones
      setBlogPosts(posts);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteBlogPost(postId);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      showNotification('Blog post deleted successfully', 'success');
    } catch (err) {
      console.error('Error deleting blog post:', err);
      showNotification('Failed to delete blog post', 'error');
    }
  };

  const handleTogglePublish = async (postId: string, currentPublishState: boolean) => {
    try {
      await togglePublishBlogPost(postId, !currentPublishState);
      
      // Update the posts list
      setBlogPosts((prevPosts) => 
        prevPosts.map((post) => 
          post.id === postId ? { ...post, published: !currentPublishState } : post
        )
      );
      
      showNotification(
        `Blog post ${!currentPublishState ? 'published' : 'unpublished'} successfully`, 
        'success'
      );
    } catch (err) {
      console.error('Error toggling publish state:', err);
      showNotification('Failed to update publish state', 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Sign out error:', err);
      showNotification('Failed to sign out', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Hide after 5 seconds
  };

  const handleEditorClose = (postSaved: boolean = false) => {
    setShowEditor(false);
    if (postSaved) {
      fetchBlogPosts(); // Refresh the posts list
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Clock className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  if (showEditor) {
    return <BlogEditor post={editingPost} onClose={handleEditorClose} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handleCreatePost}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Sign Out
            </button>
          </div>
        </div>

        {notification && (
          <div className={`mb-4 p-4 rounded-lg flex items-center ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {notification.message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Blog Management</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Clock className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="ml-2">Loading blog posts...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center text-gray-500 p-8">
              <div className="mb-4">No blog posts found.</div>
              <button
                onClick={handleCreatePost}
                className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create your first blog post
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Author</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{post.title}</td>
                      <td className="py-3 px-4">{post.author}</td>
                      <td className="py-3 px-4">{post.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit post"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleTogglePublish(post.id, post.published)}
                            className={`p-1 ${
                              post.published 
                                ? 'text-yellow-600 hover:text-yellow-800' 
                                : 'text-green-600 hover:text-green-800'
                            }`}
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            {post.published ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete post"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}