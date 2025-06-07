import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Clock, Eye, Tag } from 'lucide-react';

const articlesData = [
  {
    id: 1,
    title: 'Smart Money Moves: A Simple Guide to Planning Your Finances',
    excerpt: 'Managing your money doesn\'t have to be complicated. This article will help you understand the basics of personal finance and build a solid foundation.',
    imageUrl: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Jun 15, 2025',
    readTime: '3 min',
    viewCount: 1248,
    category: 'Budgeting',
    featured: true,
  },
  {
    id: 2,
    title: '5 Investment Strategies for Beginners in 2025',
    excerpt: 'New to investing? Learn about five proven strategies that can help you start building wealth, even with limited knowledge or experience.',
    imageUrl: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Jun 10, 2025',
    readTime: '5 min',
    viewCount: 956,
    category: 'Investing',
    featured: true,
  },
  {
    id: 3,
    title: 'Understanding Credit Scores: What You Need to Know',
    excerpt: 'Your credit score has a significant impact on your financial life. Learn what factors influence your score and how to improve it.',
    imageUrl: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'Jun 5, 2025',
    readTime: '4 min',
    viewCount: 723,
    category: 'Credit',
  },
  {
    id: 4,
    title: 'Retirement Planning in Your 30s: Start Now for a Secure Future',
    excerpt: 'It\'s never too early to plan for retirement. Discover why your 30s are a crucial time for retirement planning and what steps to take now.',
    imageUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'May 28, 2025',
    readTime: '6 min',
    viewCount: 841,
    category: 'Retirement',
  },
  {
    id: 5,
    title: 'How to Create an Emergency Fund: A Step-by-Step Guide',
    excerpt: 'An emergency fund is your financial safety net. Learn how to build one that can cover unexpected expenses and provide peace of mind.',
    imageUrl: 'https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'May 22, 2025',
    readTime: '4 min',
    viewCount: 612,
    category: 'Saving',
  },
  {
    id: 6,
    title: 'Mastering the Art of Debt Reduction: Strategies That Work',
    excerpt: 'Debt doesn\'t have to be a lifelong burden. Explore effective strategies to reduce and eventually eliminate your debt while still living well.',
    imageUrl: 'https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'May 15, 2025',
    readTime: '5 min',
    viewCount: 589,
    category: 'Debt',
  },
];

const FeaturedArticle = ({ article }: { article: typeof articlesData[0] }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full mb-3">
          {article.category}
        </span>
        <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
        <p className="text-gray-200 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {article.readTime} read
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {article.viewCount} views
            </span>
          </div>
          <button className="flex items-center text-blue-300 hover:text-white">
            Read Article <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ArticleCard = ({ article }: { article: typeof articlesData[0] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">{article.date}</span>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {article.category}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{article.excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime}
            </span>
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {article.viewCount}
            </span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Read <ArrowRight className="ml-1 w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const featuredArticles = articlesData.filter(article => article.featured);
  const regularArticles = articlesData.filter(article => !article.featured);
  
  const categories = ['All', 'Investing', 'Budgeting', 'Saving', 'Retirement', 'Credit', 'Debt'];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const filteredArticles = regularArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financial Insights</h1>
        <p className="mt-2 text-gray-600">
          Stay informed with our latest articles on personal finance, investment strategies, and financial independence.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="relative">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 text-gray-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Featured Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredArticles.map((article) => (
          <FeaturedArticle key={article.id} article={article} />
        ))}
      </div>
      
      {/* Latest Articles */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      
      {/* Financial Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Topics</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Investing', 'Retirement', 'Credit Score', 'Budgeting', 'Real Estate', 'Taxes', 'Student Loans', 'Insurance', 'Estate Planning', 'Crypto', 'Debt Management', 'Saving'].map((topic) => (
            <div key={topic} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition cursor-pointer group">
              <Tag className="w-4 h-4 text-gray-500 group-hover:text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{topic}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-6">
            Get the latest financial insights, tips, and exclusive content delivered straight to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-blue-200 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive financial updates and marketing communications from FinaQ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Articles;