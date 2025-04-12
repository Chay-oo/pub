-- Create the blog_posts table for storing blog content
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  author TEXT NOT NULL,
  readTime TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
-- Allow anyone to read published posts
CREATE POLICY "Allow public read access for published posts" 
  ON blog_posts FOR SELECT 
  USING (published = TRUE);

-- Allow authenticated users with admin role to do everything
CREATE POLICY "Allow admin users full access" 
  ON blog_posts FOR ALL 
  USING (
    auth.role() = 'authenticated' AND 
    auth.uid() IN (
      SELECT id FROM users WHERE admin = TRUE
    )
  );

-- Insert some sample blog posts for testing
INSERT INTO blog_posts (title, excerpt, content, date, imageUrl, author, readTime, published)
VALUES 
(
  'Understanding FIRE: Your Path to Financial Independence',
  'Learn the fundamentals of the FIRE movement and how you can start your journey to financial independence and early retirement.',
  'The FIRE (Financial Independence, Retire Early) movement has gained significant traction over the past decade. At its core, FIRE is about optimizing your savings and investments to achieve financial freedom earlier in life than traditional retirement age.

## What is FIRE?
FIRE is built on a few simple principles:
1. **High Savings Rate**: Aim to save 50-70% of your income.
2. **Frugal Living**: Cut unnecessary expenses without sacrificing quality of life.
3. **Smart Investing**: Focus on low-cost index funds and passive income streams.
4. **The 4% Rule**: Once your investments reach 25x your annual expenses, you can theoretically withdraw 4% annually without depleting your principal.

## How to Start Your FIRE Journey
1. Calculate your current savings rate and set targets to increase it.
2. Build a six-month emergency fund.
3. Pay off high-interest debt.
4. Maximize tax-advantaged accounts like 401(k)s and IRAs.
5. Develop additional income streams.

Remember, FIRE isn''t just about retiring early—it''s about having the freedom to make choices based on what brings you fulfillment rather than financial necessity.',
  'Mar 15, 2024',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2071',
  'Sarah Johnson',
  '5 min',
  TRUE
),
(
  'Smart Investment Strategies for Beginners',
  'A comprehensive guide to help you start your investment journey with confidence and make informed decisions.',
  'Investing can seem intimidating, but with the right approach, anyone can build wealth through the power of compound growth. This guide breaks down essential strategies for those just starting their investment journey.

## Start with Clear Goals
Before investing a single dollar, define what you''re investing for:
- Short-term goals (1-3 years)
- Medium-term goals (3-10 years)
- Long-term goals (10+ years)

Your time horizon will significantly influence your investment strategy.

## Understand Risk vs. Reward
All investments carry some level of risk, but generally:
- Higher potential returns = Higher risk
- Lower risk = Lower potential returns

As a beginner, focus on finding your risk tolerance—how much volatility you can withstand without making emotional decisions.

## Diversification is Key
Never put all your eggs in one basket. Spread your investments across:
- Different asset classes (stocks, bonds, real estate)
- Various sectors and industries
- Geographic regions (domestic and international)

## Start with Index Funds
Low-cost index funds or ETFs are ideal for beginners:
- Instant diversification
- Lower fees than actively managed funds
- Historically outperform most actively managed funds over long periods

## Consistency Matters More Than Timing
Rather than trying to time the market:
- Invest regularly regardless of market conditions
- Consider dollar-cost averaging—investing fixed amounts at regular intervals
- Stay invested through market fluctuations

Remember: The best time to start investing was yesterday. The second-best time is today.',
  'Mar 12, 2024',
  'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2070',
  'Michael Chen',
  '4 min',
  TRUE
),
(
  'Building a Strong Emergency Fund',
  'Why having an emergency fund is crucial and how to build one that provides real financial security.',
  'An emergency fund is your financial safety net—the buffer between you and life''s unexpected challenges. Without one, even minor emergencies can derail your financial progress or force you into debt.

## Why Emergency Funds Matter
- **Peace of Mind**: Sleep better knowing you can handle unexpected expenses
- **Break the Debt Cycle**: Avoid credit card debt for emergencies
- **Financial Flexibility**: Make decisions based on what''s best, not just what''s affordable right now
- **Job Loss Protection**: Provide runway if you lose your income source

## How Much Should You Save?
The general recommendation is 3-6 months of essential expenses, but consider:
- **Job Stability**: Freelancers or those in volatile industries may need 6-12 months
- **Number of Income Sources**: Single-income households need more protection
- **Health Considerations**: Those with chronic conditions may need larger funds

## Where to Keep Your Emergency Fund
Your emergency fund should be:
- **Liquid**: Easily accessible without penalties
- **Safe**: Not exposed to market volatility
- **Separate**: In a different account from daily spending
- **Earning Interest**: While safety is priority, it should earn some return

High-yield savings accounts, money market accounts, or short-term CDs (with appropriate laddering) are good options.

## Building Your Fund
1. Start with a $1,000 mini-emergency fund
2. Set automated transfers to your emergency account
3. Use windfalls (tax refunds, bonuses) to accelerate growth
4. Consider a tiered approach (some in high-liquidity accounts, some in slightly higher-yield options)

Remember that an emergency fund isn''t an investment—it''s insurance. Its job isn''t to grow but to be there when you need it most.',
  'Mar 10, 2024',
  'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=2071',
  'Emily Parker',
  '3 min',
  TRUE
);

-- Note: Run the following commands in the Supabase SQL Editor to set up the blog_posts table 

-- Run this to grant admin privileges to your user
UPDATE auth.users 
SET raw_app_meta_data = jsonb_set(
  coalesce(raw_app_meta_data, '{}'::jsonb),
  '{admin}',
  'true'
)
WHERE email = 'your_email@example.com'; 