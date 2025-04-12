import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  readTime: string;
  created_at?: string;
  updated_at?: string;
  published: boolean;
}

/**
 * Get all blog posts with optional filtering and pagination
 */
export const getAllBlogPosts = async (publishedOnly = false) => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (publishedOnly) {
      query = query.eq('published', true);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception in getAllBlogPosts:', error);
    throw error;
  }
};

/**
 * Get a single blog post by ID
 */
export const getBlogPostById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by ID:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception in getBlogPostById:', error);
    throw error;
  }
};

/**
 * Create a new blog post
 */
export const createBlogPost = async (blogPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const now = new Date().toISOString();
    
    // Format the date in a more readable format for display (Mar 15, 2024)
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const postData = {
      id: uuidv4(),
      ...blogPost,
      date: blogPost.date || formattedDate,
      created_at: now,
      updated_at: now
    };
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select();
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    
    console.log('Blog post created successfully:', data[0]);
    return data[0];
  } catch (error) {
    console.error('Exception in createBlogPost:', error);
    throw error;
  }
};

/**
 * Update an existing blog post
 */
export const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
  try {
    const now = new Date().toISOString();
    
    const updateData = {
      ...updates,
      updated_at: now
    };
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
    
    console.log('Blog post updated successfully:', data[0]);
    return data[0];
  } catch (error) {
    console.error('Exception in updateBlogPost:', error);
    throw error;
  }
};

/**
 * Delete a blog post
 */
export const deleteBlogPost = async (id: string) => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
    
    console.log('Blog post deleted successfully');
    return true;
  } catch (error) {
    console.error('Exception in deleteBlogPost:', error);
    throw error;
  }
};

/**
 * Publish or unpublish a blog post
 */
export const togglePublishBlogPost = async (id: string, publish: boolean) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ published: publish, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error toggling blog post publication status:', error);
      throw error;
    }
    
    console.log(`Blog post ${publish ? 'published' : 'unpublished'} successfully:`, data[0]);
    return data[0];
  } catch (error) {
    console.error('Exception in togglePublishBlogPost:', error);
    throw error;
  }
}; 