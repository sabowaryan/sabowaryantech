import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, SessionData, Theme, Notification } from '@/lib/types';

interface LoadingState {
  [key: string]: boolean;
}

interface ModalState {
  [key: string]: boolean;
}

interface UIPreferences {
  theme: Theme;
  sidebarCollapsed: boolean;
  language: string;
  currency: string;
  notifications: boolean;
  emailUpdates: boolean;
}

interface AppState {
  // Loading states
  loading: LoadingState;
  
  // Modal states
  modals: ModalState;
  
  // User session
  user: User | null;
  sessionData: SessionData | null;
  isAuthenticated: boolean;
  
  // UI preferences
  preferences: UIPreferences;
  
  // Notifications
  notifications: Notification[];
  
  // Search
  searchQuery: string;
  searchResults: any[];
  
  // Actions - Loading
  setLoading: (key: string, loading: boolean) => void;
  clearAllLoading: () => void;
  
  // Actions - Modals
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
  toggleModal: (key: string) => void;
  closeAllModals: () => void;
  
  // Actions - User
  setUser: (user: User | null) => void;
  setSessionData: (data: SessionData | null) => void;
  login: (user: User, sessionData?: SessionData) => void;
  logout: () => void;
  
  // Actions - Preferences
  updatePreferences: (preferences: Partial<UIPreferences>) => void;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  
  // Actions - Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Actions - Search
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any[]) => void;
  clearSearch: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      loading: {},
      modals: {},
      user: null,
      sessionData: null,
      isAuthenticated: false,
      preferences: {
        theme: 'system',
        sidebarCollapsed: false,
        language: 'en',
        currency: 'USD',
        notifications: true,
        emailUpdates: true,
      },
      notifications: [],
      searchQuery: '',
      searchResults: [],

      // Loading actions
      setLoading: (key, loading) => {
        set((state) => ({
          loading: { ...state.loading, [key]: loading },
        }));
      },

      clearAllLoading: () => {
        set({ loading: {} });
      },

      // Modal actions
      openModal: (key) => {
        set((state) => ({
          modals: { ...state.modals, [key]: true },
        }));
      },

      closeModal: (key) => {
        set((state) => ({
          modals: { ...state.modals, [key]: false },
        }));
      },

      toggleModal: (key) => {
        set((state) => ({
          modals: { ...state.modals, [key]: !state.modals[key] },
        }));
      },

      closeAllModals: () => {
        set({ modals: {} });
      },

      // User actions
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setSessionData: (sessionData) => {
        set({ sessionData });
      },

      login: (user, sessionData) => {
        set({ 
          user, 
          sessionData, 
          isAuthenticated: true 
        });
      },

      logout: () => {
        set({ 
          user: null, 
          sessionData: null, 
          isAuthenticated: false 
        });
      },

      // Preferences actions
      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      setTheme: (theme) => {
        set((state) => ({
          preferences: { ...state.preferences, theme },
        }));
      },

      toggleSidebar: () => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            sidebarCollapsed: !state.preferences.sidebarCollapsed,
          },
        }));
      },

      // Notification actions
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date(),
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      // Search actions
      setSearchQuery: (searchQuery) => {
        set({ searchQuery });
      },

      setSearchResults: (searchResults) => {
        set({ searchResults });
      },

      clearSearch: () => {
        set({ searchQuery: '', searchResults: [] });
      },
    }),
    {
      name: 'sabowaryan-app',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        preferences: state.preferences,
        user: state.user,
        sessionData: state.sessionData,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const usePreferences = () => useAppStore((state) => state.preferences);
export const useTheme = () => useAppStore((state) => state.preferences.theme);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useUnreadNotifications = () => 
  useAppStore((state) => state.notifications.filter((n) => !n.read));

// Loading selectors
export const useLoading = (key: string) => 
  useAppStore((state) => state.loading[key] || false);

// Modal selectors
export const useModal = (key: string) => 
  useAppStore((state) => state.modals[key] || false);

// Actions
export const useAppActions = () => useAppStore((state) => ({
  setLoading: state.setLoading,
  openModal: state.openModal,
  closeModal: state.closeModal,
  toggleModal: state.toggleModal,
  login: state.login,
  logout: state.logout,
  updatePreferences: state.updatePreferences,
  setTheme: state.setTheme,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
}));