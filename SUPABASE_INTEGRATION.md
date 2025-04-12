# Supabase Integration Guide for Finaq

This guide explains how to integrate the Finaq application with Supabase as a database backend to store user financial data, advice, and chat history.

## Prerequisites

- Sign up for a free Supabase account at [https://supabase.com](https://supabase.com)
- Create a new project in Supabase
- Note your Supabase project URL and anon key (public API key)

## Setup Steps

### 1. Configure Environment Variables

Add your Supabase credentials to the `.env` file:

```
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Create Database Tables

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the SQL commands from `supabase_setup.sql` file
3. Run the SQL commands to create all the required tables and security policies

### 3. Verify Table Creation

After running the SQL commands, you should see the following tables in your Supabase database:
- `users` - Stores user profiles
- `financial_data` - Stores user financial information
- `financial_advice` - Stores generated financial advice
- `chat_messages` - Stores financial expert chat history
- `newsletter_subscriptions` - Stores newsletter subscription emails
- `advisory_emails` - Stores emails for advisory PDF delivery

### 4. Authentication Setup (Optional)

If you want to implement user authentication:

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure Email Auth with appropriate settings
3. Set up your site URL and redirect URLs
4. Update your application to use Supabase Auth

## Testing the Integration

To verify your Supabase integration is working correctly:

1. Run your application with the Supabase environment variables set
2. Fill out the financial forms and submit them
3. Go to your Supabase dashboard → Table editor
4. Check that records are being created in the appropriate tables
5. Use the chat feature and verify messages are being saved

## Troubleshooting

If data is not being saved:

1. Check browser console for errors
2. Verify your Supabase URL and anon key are correct
3. Check network requests in the browser dev tools
4. Ensure database permissions allow inserts to the tables
5. Review RLS policies if you have enabled authentication

## Database Structure

- **users**: Basic user profile information
- **financial_data**: Complete financial form data in JSON format
- **financial_advice**: Generated financial advice and metrics
- **chat_messages**: Financial expert chat history
- **newsletter_subscriptions**: Email newsletter sign-ups
- **advisory_emails**: Emails for PDF delivery

## Security Considerations

- Row Level Security (RLS) is enabled on tables when using authentication
- Users can only access their own data
- Guest sessions use UUID for temporary identification

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 