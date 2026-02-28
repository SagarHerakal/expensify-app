import { create } from 'zustand';
import { User } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email: string, _password: string) => {
        set({ isLoading: true });
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
            user: { ...CURRENT_USER, email },
            isAuthenticated: true,
            isLoading: false,
        });
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },

    setUser: (user: User) => {
        set({ user, isAuthenticated: true });
    },
}));
