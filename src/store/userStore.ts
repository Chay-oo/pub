import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  fullName?: string;
  trackingId?: string; // Optional tracking ID for analytics
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: true }),
      clearCurrentUser: () => set({ currentUser: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: false,
      }),
    }
  )
);