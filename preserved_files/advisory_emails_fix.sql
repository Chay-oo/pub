-- Run this SQL script to fix the advisory_emails table

-- Drop the table if it exists
DROP TABLE IF EXISTS advisory_emails CASCADE;

-- Create the advisory_emails table with correct schema
CREATE TABLE advisory_emails (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID REFERENCES users(id),
  email TEXT NOT NULL
);

-- Enable RLS on the advisory_emails table
ALTER TABLE advisory_emails ENABLE ROW LEVEL SECURITY;

-- Create anonymous access policies for the advisory_emails table
CREATE POLICY allow_anon_select ON advisory_emails FOR SELECT USING (true);
CREATE POLICY allow_anon_insert ON advisory_emails FOR INSERT WITH CHECK (true);
CREATE POLICY allow_anon_update ON advisory_emails FOR UPDATE USING (true);

-- Create index for better query performance
CREATE INDEX idx_advisory_emails_user_id ON advisory_emails(user_id);

-- Verify the table structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'advisory_emails';

-- Verify the foreign key constraint
SELECT tc.constraint_name, tc.table_name, kcu.column_name, 
       ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE constraint_type = 'FOREIGN KEY' 
  AND tc.table_name='advisory_emails'; 