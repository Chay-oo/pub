-- IMPORTANT: Run these SQL fixes in your Supabase SQL Editor immediately
-- These fixes will resolve the data saving issues

-- Drop existing tables with cascade to avoid constraint issues
DROP TABLE IF EXISTS financial_advice CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS financial_data CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table with the correct schema
CREATE TABLE users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email TEXT NOT NULL,
  full_name TEXT,
  age INTEGER,
  occupation TEXT,
  dependents INTEGER
);

-- Create financial_data table with the correct schema
CREATE TABLE financial_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES users(id),
  personal JSONB,
  income JSONB,
  expenses JSONB,
  loans JSONB,
  insurance JSONB,
  investments JSONB
);

-- Re-create financial_advice table
CREATE TABLE financial_advice (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES users(id),
  advice_content TEXT,
  metrics JSONB
);

-- Re-create chat_messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES users(id),
  session_id UUID,
  role TEXT,
  content TEXT
);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_advice ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create anonymous access policies for all tables
CREATE POLICY allow_anon_select ON users FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON users FOR INSERT WITH CHECK (true);
CREATE POLICY allow_anon_update ON users FOR UPDATE USING (true);

CREATE POLICY allow_anon_select ON financial_data FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON financial_data FOR INSERT WITH CHECK (true);
CREATE POLICY allow_anon_update ON financial_data FOR UPDATE USING (true);

CREATE POLICY allow_anon_select ON financial_advice FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON financial_advice FOR INSERT WITH CHECK (true);

CREATE POLICY allow_anon_select ON chat_messages FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON chat_messages FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_financial_data_user_id ON financial_data(user_id);
CREATE INDEX idx_financial_advice_user_id ON financial_advice(user_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_user_session ON chat_messages(user_id, session_id);

-- Verify table structure with these queries:
-- SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name IN ('users', 'financial_data');
-- SELECT * FROM pg_constraint WHERE conrelid = 'financial_data'::regclass; 