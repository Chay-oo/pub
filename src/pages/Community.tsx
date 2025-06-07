import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Users, 
  TrendingUp, 
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Clock,
  Heart,
  MessageCircle
} from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  
  const discussionCategories = ['All', 'Investing', 'Retirement', 'Budgeting', 'Debt', 'Real Estate', 'Tax Planning'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Community</h1>
        <p className="mt-2 text-gray-600">
          Join discussions with other members, share your experiences, and learn from the community.
        </p>
      </div>
      
      {/* Community Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Community Members</p>
              <p className="text-2xl font-bold text-gray-900">24,582</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Discussions</p>
              <p className="text-2xl font-bold text-gray-900">1,872</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
              <ThumbsUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Helpful Answers</p>
              <p className="text-2xl font-bold text-gray-900">12,489</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Today</p>
              <p className="text-2xl font-bold text-gray-900">+124</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'discussions' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('discussions')}
          >
            Discussions
          </button>
          <button 
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'questions' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('questions')}
          >
            Questions & Answers
          </button>
          <button 
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'success' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('success')}
          >
            Success Stories
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search discussions..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <button className="flex items-center justify-between space-x-2 w-48 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <span>Most Recent</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <MessageSquare className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {discussionCategories.map((category) => (
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
        </div>
        
        {/* Discussion List */}
        <div className="divide-y divide-gray-200">
          <div className="p-6 hover:bg-gray-50 transition">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  MJ
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600">
                    What's your experience with index fund investing?
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    Investing
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-3">
                  I'm planning to start investing in index funds as part of my retirement strategy. Would love to hear about your experiences, which funds you recommend, and any tips for a beginner. I'm particularly interested in low-cost options with good track records.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      24 likes
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      14 comments
                    </div>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      2 hours ago
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read more <ArrowRight className="inline w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 hover:bg-gray-50 transition">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  AL
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600">
                    How I paid off $50,000 in debt in just 18 months
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                    Debt
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-3">
                  I want to share my debt payoff journey with the community. It wasn't easy, but with the right strategy and discipline, I managed to eliminate $50,000 in debt (a mix of student loans and credit cards) in just a year and a half. Here's how I did it...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      78 likes
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      32 comments
                    </div>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      5 hours ago
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read more <ArrowRight className="inline w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 hover:bg-gray-50 transition">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  TS
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600">
                    Thoughts on the housing market in 2025?
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Real Estate
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-3">
                  I'm considering buying my first home this year but I'm concerned about the current market conditions. Interest rates seem to be stabilizing, but prices are still high in many areas. Is 2025 a good time to buy? What are others seeing in their local markets?
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      46 likes
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      29 comments
                    </div>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      1 day ago
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read more <ArrowRight className="inline w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 hover:bg-gray-50 transition">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600">
                    Recommendations for budgeting apps in 2025?
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Budgeting
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-3">
                  I'm looking for a good budgeting app that syncs across devices and can connect to multiple financial accounts. What are you all using in 2025? Any pros and cons to share from your experience? I've tried a couple but haven't found the perfect fit yet.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      31 likes
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      42 comments
                    </div>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      2 days ago
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read more <ArrowRight className="inline w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium">
              3
            </button>
            <span className="text-gray-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 text-sm font-medium">
              12
            </button>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
            Next
          </button>
        </div>
      </div>
      
      {/* Top Contributors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Top Contributors</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {[
            { name: 'Michael Johnson', role: 'Financial Advisor', contributions: 156, avatar: 'MJ', color: 'from-blue-500 to-indigo-600' },
            { name: 'Sarah Williams', role: 'Retirement Specialist', contributions: 132, avatar: 'SW', color: 'from-emerald-500 to-teal-600' },
            { name: 'David Kim', role: 'Investment Analyst', contributions: 118, avatar: 'DK', color: 'from-purple-500 to-pink-600' },
            { name: 'Lisa Chen', role: 'Tax Expert', contributions: 94, avatar: 'LC', color: 'from-amber-500 to-orange-600' },
          ].map((contributor, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${contributor.color} rounded-full flex items-center justify-center text-white text-xl font-bold mb-3`}>
                {contributor.avatar}
              </div>
              <h4 className="font-medium text-gray-900">{contributor.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{contributor.role}</p>
              <div className="flex items-center text-xs text-gray-600">
                <Heart className="w-3 h-3 mr-1 text-red-500" />
                {contributor.contributions} contributions
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Join the Community */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Join Our Financial Community</h2>
            <p className="text-blue-100 mb-6">
              Connect with like-minded individuals, share your financial journey, and learn from others' experiences.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Connect with peers</p>
                  <p className="text-sm text-blue-100">Network with others on similar financial journeys</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Ask questions</p>
                  <p className="text-sm text-blue-100">Get advice from the community and financial experts</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-white">Share success stories</p>
                  <p className="text-sm text-blue-100">Inspire others with your financial achievements</p>
                </div>
              </div>
            </div>
            
            <button className="mt-8 px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition">
              Create an Account
            </button>
          </div>
          
          <div className="hidden md:block md:w-1/3 relative">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;