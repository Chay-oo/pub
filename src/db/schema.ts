export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface AdvisoryEmail {
  id: string;
  email: string;
  user_id: string;
  sent_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface FinancialData {
  id: string;
  user_id: string;
  data_type: string;
  content: string;
  created_at: string;
}