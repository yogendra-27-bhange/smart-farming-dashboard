import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/auth';
import { getCurrentUser as getMockCurrentUser, login as mockLogin, logout as mockLogout, signup as mockSignup } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<User | null>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<User | null>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getMockCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password?: string) => {
    setIsLoading(true);
    const loggedInUser = await mockLogin(email, password);
    setUser(loggedInUser);
    setIsLoading(false);
    if (loggedInUser) {
      router.push('/dashboard');
    }
    return loggedInUser;
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await mockLogout();
    setUser(null);
    setIsLoading(false);
    router.push('/login');
  }, [router]);

  const signup = useCallback(async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    try {
      const signedUpUser = await mockSignup(name, email, password);
      setUser(signedUpUser);
      if (signedUpUser) {
        router.push('/dashboard'); // Or '/login' to force login after signup
      }
      return signedUpUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);


  return { user, isLoading, login, logout, signup };
}
