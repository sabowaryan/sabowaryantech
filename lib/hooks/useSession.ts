import { useEffect } from 'react';
import { useUserStore } from '../store/user-store';

export function useSession() {
  const user = useUserStore((s) => s.user);
  const session = useUserStore((s) => s.session);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const isLoading = useUserStore((s) => s.isLoading);
  const error = useUserStore((s) => s.error);
  const login = useUserStore((s) => s.login);
  const logout = useUserStore((s) => s.logout);
  const setUser = useUserStore((s) => s.setUser);
  const setSession = useUserStore((s) => s.setSession);

  // Auto-refresh session (exemple simple)
  useEffect(() => {
    if (!session) return;
    const interval = setInterval(() => {
      // Ici, on pourrait rafraîchir le token via une API
      // setSession(newSession)
    }, 1000 * 60 * 10); // 10 min
    return () => clearInterval(interval);
  }, [session, setSession]);

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setUser,
    setSession,
  };
} 