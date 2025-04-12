import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getBlogPostById, BlogPost as BlogPostType } from '../services/blogService';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError('Blog post ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blogPost = await getBlogPostById(id);
        
        // Check if the post exists and is published
        if (!blogPost) {
          setError('Blog post not found');
        } else if (!blogPost.published) {
          setError('This blog post is not currently available');
        } else {
          setPost(blogPost);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'FinaQ Blog Post',
        text: post?.excerpt || 'Check out this blog post from FinaQ',
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy link'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Return to Home
            </button>
          </div>
        ) : post ? (
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-64 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x400?text=Image+Not+Found';
              }}
            />
            
            <div className="p-8">
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime} read</span>
                </div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-1" />
                  <span>By {post.author}</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="prose max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={handleShareClick}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share this article
                </button>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
} 