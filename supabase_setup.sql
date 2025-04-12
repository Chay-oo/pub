-- Drop tables in the correct order (respecting foreign key dependencies)
DROP TABLE IF EXISTS advisory_emails;
DROP TABLE IF EXISTS newsletter_subscriptions;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS financial_advice;
DROP TABLE IF EXISTS financial_data;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email TEXT NOT NULL,
  full_name TEXT,
  age INTEGER,
  occupation TEXT,
  dependents INTEGER
);

-- Create financial_data table to store user financial information
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

-- Create financial_advice table to store generated advice
CREATE TABLE financial_advice (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  advice_content TEXT,
  metrics JSONB
);

-- Create chat_messages table to store chat history
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL
);

-- Create newsletter_subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL
);

-- Create advisory_emails table
CREATE TABLE advisory_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL
);

-- Create RLS (Row Level Security) policies
-- Users should only access their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_advice ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy for users table
CREATE POLICY user_policy ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Policy for financial_data table
CREATE POLICY financial_data_policy ON financial_data
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for financial_advice table
CREATE POLICY financial_advice_policy ON financial_advice
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for chat_messages table
CREATE POLICY chat_messages_policy ON chat_messages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster querying
CREATE INDEX idx_financial_data_user ON financial_data(user_id);
CREATE INDEX idx_financial_advice_user ON financial_advice(user_id);
CREATE INDEX idx_chat_messages_user_session ON chat_messages(user_id, session_id);

-- Add these policies to enable anonymous access for testing
-- These should be executed separately after the main setup

-- Allow anonymous access to financial_data table
DROP POLICY IF EXISTS allow_anon_select ON financial_data;
DROP POLICY IF EXISTS allow_anon_insert ON financial_data;
DROP POLICY IF EXISTS allow_anon_update ON financial_data;

CREATE POLICY allow_anon_select ON financial_data FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON financial_data FOR INSERT WITH CHECK (true);
CREATE POLICY allow_anon_update ON financial_data FOR UPDATE USING (true);

-- Allow anonymous access to financial_advice table
DROP POLICY IF EXISTS allow_anon_select ON financial_advice;
DROP POLICY IF EXISTS allow_anon_insert ON financial_advice;

CREATE POLICY allow_anon_select ON financial_advice FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON financial_advice FOR INSERT WITH CHECK (true);

-- Allow anonymous access to chat_messages table
DROP POLICY IF EXISTS allow_anon_select ON chat_messages;
DROP POLICY IF EXISTS allow_anon_insert ON chat_messages;

CREATE POLICY allow_anon_select ON chat_messages FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON chat_messages FOR INSERT WITH CHECK (true);

-- Allow anonymous access to users table 
DROP POLICY IF EXISTS allow_anon_select ON users;
DROP POLICY IF EXISTS allow_anon_insert ON users;
DROP POLICY IF EXISTS allow_anon_update ON users;

CREATE POLICY allow_anon_select ON users FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON users FOR INSERT WITH CHECK (true);
CREATE POLICY allow_anon_update ON users FOR UPDATE USING (true);

-- Run these SQL statements to quickly verify your table structure
-- SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name IN ('users', 'financial_data');

-- Execute these SQL statements to check foreign key constraints
-- SELECT tc.table_schema, tc.constraint_name, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
-- FROM information_schema.table_constraints tc
-- JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
-- JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
-- WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name='financial_data'; 