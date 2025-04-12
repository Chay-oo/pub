import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmailState {
  newsletterEmails: string[];
  advisoryEmails: string[];
  addNewsletterEmail: (email: string) => void;
  addAdvisoryEmail: (email: string) => void;
  getNewsletterEmails: () => string[];
  getAdvisoryEmails: () => string[];
}

export const useEmailStore = create<EmailState>()(
  persist(
    (set, get) => ({
      newsletterEmails: [],
      advisoryEmails: [],
      
      addNewsletterEmail: (email: string) => set((state) => ({
        newsletterEmails: [...new Set([...state.newsletterEmails, email])]
      })),
      
      addAdvisoryEmail: (email: string) => set((state) => ({
        advisoryEmails: [...new Set([...state.advisoryEmails, email])]
      })),
      
      getNewsletterEmails: () => get().newsletterEmails,
      getAdvisoryEmails: () => get().advisoryEmails,
    }),
    {
      name: 'email-storage',
    }
  )
);