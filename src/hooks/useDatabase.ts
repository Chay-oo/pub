import { useState } from 'react';
import {
  saveNewsletterSubscription,
  saveAdvisoryEmail,
  saveChatMessage,
  saveFinancialData,
} from '../services/databaseService';

export const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNewsletterSubscription = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await saveNewsletterSubscription(email);
      return true;
    } catch (err) {
      setError('Failed to save newsletter subscription');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvisoryEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await saveAdvisoryEmail(email);
      return true;
    } catch (err) {
      setError('Failed to save advisory email');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatMessage = async (content: string, role: 'user' | 'assistant') => {
    setIsLoading(true);
    setError(null);
    try {
      await saveChatMessage(content, role);
      return true;
    } catch (err) {
      setError('Failed to save chat message');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinancialData = async (dataType: string, content: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await saveFinancialData(dataType, content);
      return true;
    } catch (err) {
      setError('Failed to save financial data');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleNewsletterSubscription,
    handleAdvisoryEmail,
    handleChatMessage,
    handleFinancialData,
  };
};