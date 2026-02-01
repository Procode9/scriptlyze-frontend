import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username?: string;
  plan: string;
  analyses_this_month: number;
  total_analyses: number;
  created_at: string;
}

interface StoreState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),
  
  logout: () => {
    localStorage.removeItem('token');
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
}));
