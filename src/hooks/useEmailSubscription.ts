import { useState } from 'react';
import { validateEmail } from '../utils/validation';
import { useEmailStore } from '../store/emailStore';

export const useEmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const addNewsletterEmail = useEmailStore((state) => state.addNewsletterEmail);
  const addAdvisoryEmail = useEmailStore((state) => state.addAdvisoryEmail);

  const handleNewsletterSubscription = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    addNewsletterEmail(email);
    setError('');
    setEmail('');
    return true;
  };

  const handleAdvisorySubscription = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    addAdvisoryEmail(email);
    setError('');
    setEmail('');
    return true;
  };

  return {
    email,
    setEmail,
    error,
    setError,
    handleNewsletterSubscription,
    handleAdvisorySubscription,
  };
};