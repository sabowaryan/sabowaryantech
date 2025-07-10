import { create } from 'zustand';
import { User, Session } from '../types';

interface UserState {
  user: User | undefined;
  session: Session | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | undefined;
  login: (user: User, session: Session) => void;
  logout: () => void;
  setUser: (user: User | undefined) => void;
  setSession: (session: Session | undefined) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  session: undefined,
  isAuthenticated: false,
  isLoading: false,
  error: undefined,
  login: (user, session) => set({ user, session, isAuthenticated: true, error: undefined }),
  logout: () => set({ user: undefined, session: undefined, isAuthenticated: false }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
})); 