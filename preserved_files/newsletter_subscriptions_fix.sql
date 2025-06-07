-- Run this SQL script to fix the newsletter_subscriptions table

-- Drop the table if it exists
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;

-- Create the newsletter_subscriptions table with correct schema
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email TEXT NOT NULL
);

-- Enable RLS on the newsletter_subscriptions table
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create anonymous access policies for the newsletter_subscriptions table
CREATE POLICY allow_anon_select ON newsletter_subscriptions FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);

-- Verify the table structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'newsletter_subscriptions'; 