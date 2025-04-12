import { supabase, User, FinancialData, FinancialAdvice, ChatMessage } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '../store/userStore';
import { downloadFile } from '../utils/dataExport/fileDownload';
import { formatToJSON } from '../utils/dataExport/formatters';

// Auth - User session management
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }
  return session?.user || null;
};

export const signUpUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// User profile management
export const createUserProfile = async (userData: User) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select();
  
  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select();
  
  if (error) throw error;
  return data;
};

// Helper function to ensure user exists before saving financial data
export const ensureUserExists = async (userId: string, userData?: any) => {
  console.log('Ensuring user exists in database:', userId);
  
  try {
    // First check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
    
    if (fetchError) {
      console.error('Error checking if user exists:', fetchError);
      return false;
    }
    
    // If user doesn't exist, create them
    if (!existingUser) {
      console.log('User does not exist, creating user record');
      
      // Generate a default email if none is provided
      const defaultEmail = `guest_${userId.substring(0, 8)}@example.com`;
      
      // Prepare basic user data if not provided
      // Match the exact field names expected by Supabase
      const userObject = userData || {
        id: userId,
        email: defaultEmail,
        full_name: 'Guest User',
        age: 30,
        occupation: 'Not Specified',
        dependents: 0,
        created_at: new Date().toISOString()
      };
      
      // Make sure ID is included and email has a default value if empty
      userObject.id = userId;
      if (!userObject.email) {
        userObject.email = defaultEmail;
      }

      // Log the exact object being sent to Supabase
      console.log('User object being inserted:', JSON.stringify(userObject));
      
      // Insert the user
      const { data, error } = await supabase
        .from('users')
        .insert([userObject])
        .select();
      
      if (error) {
        console.error('Error creating user:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        
        // Try a simplified insert as fallback
        console.log('Attempting simplified user creation');
        const simplifiedUser = {
          id: userId,
          email: defaultEmail,
          full_name: 'Guest User'
        };
        
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('users')
          .insert([simplifiedUser])
          .select();
        
        if (fallbackError) {
          console.error('Fallback user creation also failed:', fallbackError);
          return false;
        }
        
        console.log('User created via fallback:', fallbackData);
        return true;
      }
      
      console.log('User created successfully:', data);
      return true;
    }
    
    console.log('User already exists');
    return true;
  } catch (error) {
    console.error('Exception in ensureUserExists:', error);
    return false;
  }
};

// Financial data management
export const saveFinancialData = async (userId: string, financialData: any) => {
  console.log('Attempting to save financial data to Supabase for user:', userId);
  console.log('Supabase configuration loaded:', supabase ? 'Yes' : 'No');
  
  try {
    // Generate a default email if needed
    const defaultEmail = `guest_${userId.substring(0, 8)}@example.com`;
    
    // Ensure user exists before trying to save financial data
    // Create user with fields matching exact Supabase schema
    const userData = financialData.personal ? {
      id: userId,
      email: financialData.personal.email || defaultEmail,
      full_name: financialData.personal.fullName || 'Guest User',
      age: financialData.personal.age || 30,
      occupation: financialData.personal.occupation || 'Not Specified',
      dependents: financialData.personal.dependents || 0,
      created_at: new Date().toISOString()
    } : null;
    
    const userExists = await ensureUserExists(userId, userData);
    if (!userExists) {
      console.error('Failed to ensure user exists, cannot save financial data');
      // Save to local storage as fallback
      return saveGuestFinancialData(userId, financialData);
    }
    
    // First check if user already has financial data
    const { data: existingData, error: fetchError } = await supabase
      .from('financial_data')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (fetchError) {
      console.error('Error fetching existing data:', fetchError);
      throw fetchError;
    }
    
    // Prepare the data object
    const dataObject: FinancialData = {
      user_id: userId,
      personal: financialData.personal || null,
      income: financialData.income || null,
      expenses: financialData.expenses || null,
      loans: financialData.loans || null,
      insurance: financialData.insurance || null,
      investments: financialData.investments || null,
      created_at: new Date().toISOString()
    };
    
    console.log('Data prepared for saving:', JSON.stringify(dataObject).substring(0, 100) + '...');
    
    // If data exists, update it, otherwise insert new record
    if (existingData) {
      console.log('Updating existing financial data record:', existingData.id);
      const { data, error } = await supabase
        .from('financial_data')
        .update(dataObject)
        .eq('id', existingData.id)
        .select();
      
      if (error) {
        console.error('Error updating financial data:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        // Also try saving to local storage as fallback
        saveGuestFinancialData(userId, financialData);
        throw error;
      }
      
      console.log('Financial data updated successfully');
      return data;
    } else {
      console.log('Creating new financial data record');
      
      // Try with explicit conversion of all data to JSON strings
      try {
        const safeDataObject = {
          ...dataObject,
          personal: JSON.stringify(dataObject.personal),
          income: JSON.stringify(dataObject.income),
          expenses: JSON.stringify(dataObject.expenses),
          loans: JSON.stringify(dataObject.loans),
          insurance: JSON.stringify(dataObject.insurance),
          investments: JSON.stringify(dataObject.investments)
        };
        
        console.log('Using JSON stringified data for insert');
        const { data, error } = await supabase
          .from('financial_data')
          .insert([safeDataObject])
          .select();
        
        if (error) {
          console.error('Error inserting financial data with JSON approach:', error);
          // Try the original approach
          throw error;
        }
        
        console.log('Financial data inserted successfully with JSON approach');
        return data;
      } catch (jsonError) {
        console.error('JSON insert approach failed, trying original method');
        
        // Try original approach as fallback
        const { data, error } = await supabase
          .from('financial_data')
          .insert([dataObject])
          .select();
        
        if (error) {
          console.error('Error inserting financial data (original method):', error);
          console.error('Error details:', error.details, error.hint, error.message);
          // Also try saving to local storage as fallback
          saveGuestFinancialData(userId, financialData);
          throw error;
        }
        
        console.log('Financial data inserted successfully with original method');
        return data;
      }
    }
  } catch (error) {
    console.error('Exception in saveFinancialData:', error);
    // Save to local storage as fallback
    console.log('Falling back to local storage');
    return saveGuestFinancialData(userId, financialData);
  }
};

export const getFinancialData = async (userId: string) => {
  const { data, error } = await supabase
    .from('financial_data')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) throw error;
  return data;
};

// Financial advice management
export const saveFinancialAdvice = async (userId: string, adviceContent: string, metrics: any) => {
  const adviceObject: FinancialAdvice = {
    user_id: userId,
    advice_content: adviceContent,
    metrics
  };
  
  const { data, error } = await supabase
    .from('financial_advice')
    .insert([adviceObject])
    .select();
  
  if (error) throw error;
  return data;
};

export const getFinancialAdvice = async (userId: string) => {
  const { data, error } = await supabase
    .from('financial_advice')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data;
};

// Chat messages management
export const saveChat = async (userId: string, sessionId: string, role: 'user' | 'assistant', content: string) => {
  const chatObject: ChatMessage = {
    user_id: userId,
    session_id: sessionId,
    role,
    content
  };
  
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([chatObject])
    .select();
  
  if (error) throw error;
  return data;
};

export const getChatHistory = async (userId: string, sessionId: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
};

// Guest user support - for users without login
export const createGuestSession = () => {
  // For database operations, we need a standard UUID format
  return uuidv4();
};

// For analytics tracking, we can use a more complex ID with additional entropy
export const createTrackingId = () => {
  // Create a truly unique tracking ID with multiple entropy sources
  const timestamp = new Date().getTime();
  const randomSuffix = Math.floor(Math.random() * 1000000);
  const baseId = uuidv4();
  
  // Add browser fingerprinting elements for additional entropy
  const userAgent = navigator.userAgent || 'unknown';
  const screenWidth = window.screen.width || 0;
  const screenHeight = window.screen.height || 0;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
  
  // Hash some browser fingerprint data
  const fingerprint = `${userAgent.length}-${screenWidth}-${screenHeight}-${timeZone.length}`;
  
  // Combine all sources of entropy
  return `${baseId}-${timestamp}-${randomSuffix}-${fingerprint}`;
};

export const saveGuestFinancialData = async (guestId: string, financialData: any) => {
  // Store data in local storage for guest users
  localStorage.setItem(`guest_financial_data_${guestId}`, JSON.stringify(financialData));
  return { id: guestId, ...financialData };
};

export const getGuestFinancialData = (guestId: string) => {
  const data = localStorage.getItem(`guest_financial_data_${guestId}`);
  return data ? JSON.parse(data) : null;
};

export const saveNewsletterSubscription = async (email: string) => {
  try {
    console.log('Attempting to save newsletter subscription for email:', email);
    
    // First check if we have a user with this email already
    const { data: existingUsers, error: userFetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);
      
    if (userFetchError) {
      console.error('Error checking for existing user:', userFetchError);
    }
    
    let userId = '';
    let trackingId = '';
    
    // If no existing user, create one first
    if (!existingUsers || existingUsers.length === 0) {
      console.log('No existing user found, creating a new user for email:', email);
      
      // Generate a standard UUID for database compatibility
      userId = uuidv4();
      trackingId = createTrackingId(); // For analytics purposes
      
      console.log('Generated new user ID for newsletter subscription:', userId);
      console.log('Generated tracking ID:', trackingId);
      
      // Create a simple user object
      const userObject = {
        id: userId,
        email: email,
        full_name: 'Newsletter Subscriber'
      };
      
      // Try to create the user first
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([userObject])
        .select();
      
      if (userError) {
        console.error('Error creating user for newsletter subscription:', userError);
        console.error('Error details:', userError.details, userError.hint, userError.message);
        // Continue anyway to try to save the newsletter subscription
      } else {
        console.log('User created successfully for newsletter subscription:', userData);
      }
    } else {
      // Use the existing user ID
      userId = existingUsers[0].id;
      console.log('Using existing user for newsletter subscription:', userId);
    }
    
    // Create the subscription object with proper typing
    const subscriptionObject: {
      email: string;
      created_at: string;
      user_id?: string;
    } = { 
      email,
      created_at: new Date().toISOString()
    };
    
    // If we have a user ID, include it
    if (userId) {
      subscriptionObject.user_id = userId;
    }
    
    // Insert into the newsletter_subscriptions table
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([subscriptionObject])
      .select();
      
    if (error) {
      console.error('Error saving newsletter subscription:', error);
      console.error('Error details:', error.details, error.hint, error.message);
      
      // If the error is about a duplicate email, we can return success
      // This is common when users subscribe multiple times
      if (error.code === '23505' && error.details?.includes('email')) {
        console.log('User already subscribed with this email, treating as success');
        return [{ email, id: 'existing', user_id: userId }];
      }
      
      throw error;
    }
    
    console.log('Newsletter subscription saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception in saveNewsletterSubscription:', error);
    throw error;
  }
};

export const saveAdvisoryEmail = async (email: string) => {
  try {
    console.log('Attempting to save advisory email:', email);
    
    // Get the current user
    const currentUser = useUserStore.getState().currentUser;
    
    // If no current user, create one first
    if (!currentUser) {
      console.log('No current user, creating a new user for email:', email);
      
      // Generate a standard UUID for database compatibility
      const userId = uuidv4();
      const trackingId = createTrackingId(); // For analytics purposes
      
      console.log('Generated new user ID for advisory email:', userId);
      console.log('Generated tracking ID:', trackingId);
      
      // Create a simple user object
      const userObject = {
        id: userId,
        email: email,
        full_name: 'Email Subscriber'
      };
      
      // Try to create the user first
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([userObject])
        .select();
      
      if (userError) {
        console.error('Error creating user for advisory email:', userError);
        console.error('Error details:', userError.details, userError.hint, userError.message);
        throw userError;
      }
      
      console.log('User created successfully for email:', userData);
      
      // Update the user store
      useUserStore.getState().setCurrentUser({ 
        id: userId, 
        email,
        trackingId
      });
      
      // Now create the advisory email entry
      const advisoryEmailObject = {
        user_id: userId,
        email: email
      };
      
      console.log('Inserting advisory email with data:', advisoryEmailObject);
      
      const { data, error } = await supabase
        .from('advisory_emails')
        .insert([advisoryEmailObject])
        .select();
        
      if (error) {
        console.error('Error saving advisory email:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        throw error;
      }
      
      console.log('Advisory email saved successfully:', data);
      return data;
    } 
    
    // If we have a current user, use their ID
    console.log('Using existing user for advisory email:', currentUser.id);
    
    const advisoryEmailObject = {
      user_id: currentUser.id,
      email: email
    };
    
    console.log('Inserting advisory email with data:', advisoryEmailObject);
    
    const { data, error } = await supabase
      .from('advisory_emails')
      .insert([advisoryEmailObject])
      .select();
      
    if (error) {
      console.error('Error saving advisory email for existing user:', error);
      console.error('Error details:', error.details, error.hint, error.message);
      throw error;
    }
    
    console.log('Advisory email saved successfully for existing user:', data);
    return data;
  } catch (error) {
    console.error('Exception in saveAdvisoryEmail:', error);
    throw error;
  }
};

export const getAllNewsletterSubscriptions = async () => {
  try {
    const { data, error } = await supabase.from('newsletter_subscriptions').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    throw error;
  }
};

export const getAllAdvisoryEmails = async () => {
  try {
    const { data, error } = await supabase.from('advisory_emails').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching advisory emails:', error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const { data: user, error: userError } = await supabase.from('users').select('*').eq('id', userId).single();
    if (userError) throw userError;
    
    const financialData = await getFinancialData(userId);
    const chatMessages = await getChatHistory(userId, 'default');
    
    return {
      user,
      financialData,
      chatMessages
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const exportUserData = async (userId: string) => {
  try {
    const data = await getUserData(userId);
    const exportData = {
      ...data,
      exportedAt: new Date().toISOString()
    };
    
    const jsonContent = formatToJSON(exportData);
    downloadFile(jsonContent, `user_data_${userId}.json`, 'application/json');
    
    return exportData;
  } catch (error) {
    console.error('Error exporting user data:', error);
    throw error;
  }
};