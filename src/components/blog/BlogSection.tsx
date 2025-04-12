import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import { getAllBlogPosts, BlogPost } from '../../services/blogService';
import { Loader } from 'lucide-react';

export default function BlogSection() {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        // Only fetch published posts for the public-facing blog section
        const posts = await getAllBlogPosts(true);
        setBlogPosts(posts);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  const handleViewAllClick = () => {
    // Implement blog listing page later
    console.log('View all articles clicked');
    // For now, just scroll to the blog section
    window.scrollTo({
      top: document.getElementById('blog-section')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  return (
    <section id="blog-section" className="py-12 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Financial Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest articles on personal finance, investment strategies, and financial independence.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center text-gray-500 p-4">No blog posts available.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                imageUrl={post.imageUrl}
                author={post.author}
                readTime={post.readTime}
                onClick={() => handleBlogClick(post.id)}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button 
            onClick={handleViewAllClick}
            className="inline-flex items-center px-6 py-3 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
          >
            View All Articles
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}