import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Database types - will be expanded as needed
export type User = {
  id?: string;
  created_at?: string;
  email: string;
  full_name: string;
  age: number;
  occupation: string;
  dependents: number;
};

export type FinancialData = {
  id?: string;
  user_id: string;
  created_at?: string;
  personal: any;
  income: any;
  expenses: any;
  loans: any;
  insurance: any;
  investments: any;
};

export type FinancialAdvice = {
  id?: string;
  user_id: string;
  created_at?: string;
  advice_content: string;
  metrics: any;
};

export type ChatMessage = {
  id?: string;
  user_id: string;
  created_at?: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
}; 