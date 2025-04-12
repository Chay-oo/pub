import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, LineChart, Shield, Lock } from 'lucide-react';
import BlogSection from '../components/blog/BlogSection';
import NewsletterSubscription from '../components/email/NewsletterSubscription';
import { useUserStore } from '../store/userStore';
import { createGuestSession, createTrackingId } from '../services/databaseService';

export default function LandingPage() {
  const navigate = useNavigate();
  const { clearCurrentUser, setCurrentUser } = useUserStore();

  // Reset user ID and create a fresh one for each new visitor
  useEffect(() => {
    // First clear any existing user to prevent reusing IDs
    clearCurrentUser();

    // Create a new unique guest user for tracking analytics
    // Use standard UUID format for database compatibility
    const uniqueGuestId = createGuestSession();
    const trackingId = createTrackingId(); // For analytics tracking
    
    console.log('Created new unique visitor ID:', uniqueGuestId);
    console.log('Created tracking ID:', trackingId);

    // Set this as the current user with anonymous info
    setCurrentUser({
      id: uniqueGuestId,
      email: `visitor_${uniqueGuestId.substring(0, 8)}@example.com`,
      fullName: 'New Visitor',
      trackingId: trackingId
    });
  }, [clearCurrentUser, setCurrentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">
            Welcome to FinaQ
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Take control of your financial future with personalized insights and expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/personal')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Start Your Financial Journey
            </button>
            <button
              onClick={() => navigate('/calculators')}
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors duration-200"
            >
              Financial Calculators
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-center mb-4">
                <Wallet className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personal Finance</h3>
              <p className="text-gray-600">Get a clear picture of your income and expenses</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-center mb-4">
                <LineChart className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Analysis</h3>
              <p className="text-gray-600">Receive personalized financial insights</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Planning</h3>
              <p className="text-gray-600">Plan your future with confidence</p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mb-12">
            <NewsletterSubscription />
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <BlogSection />

      {/* Footer */}
      <div className="container mx-auto px-4 py-8">
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 max-w-2xl mx-auto text-center mb-4">
          Disclaimer: The financial recommendations provided are for informational purposes only and should not be considered as professional financial advice. Past performance does not guarantee future results. Please consult with qualified financial advisors before making any investment or financial decisions. By using this tool, you acknowledge that all financial decisions and associated risks are your responsibility.
        </p>
        
        {/* Admin Link */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => navigate('/admin/login')}
            className="flex items-center text-gray-500 text-sm hover:text-indigo-600"
          >
            <Lock className="w-3 h-3 mr-1" />
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}