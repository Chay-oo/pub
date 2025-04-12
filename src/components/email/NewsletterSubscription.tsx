import React, { useState } from 'react';
import { Check, Loader } from 'lucide-react';
import EmailInput from './EmailInput';
import { validateEmail } from '../../utils/validation';
import { useEmailStore } from '../../store/emailStore';
import { saveNewsletterSubscription } from '../../services/databaseService';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addNewsletterEmail = useEmailStore((state) => state.addNewsletterEmail);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Save to Supabase database
      console.log('Saving newsletter email to database:', email);
      const result = await saveNewsletterSubscription(email);
      console.log('Newsletter subscription saved to database:', result);
      
      // Also save to local store
      addNewsletterEmail(email);
      
      setIsSubscribed(true);
      setShowSubscribeForm(false);
      setEmail('');
    } catch (error) {
      console.error('Error saving newsletter subscription:', error);
      setError('Failed to save your subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-center space-x-2 text-emerald-600">
        <Check className="w-5 h-5" />
        <span>Thank you for subscribing to our newsletter!</span>
      </div>
    );
  }

  if (showSubscribeForm) {
    return (
      <form onSubmit={handleSubscribe} className="flex flex-col items-center space-y-3">
        <EmailInput
          email={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
          onErrorChange={setError}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setShowSubscribeForm(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setShowSubscribeForm(true)}
      className="flex items-center justify-center space-x-2 mx-auto bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
    >
      <span>Subscribe for Monthly Newsletter</span>
    </button>
  );
}