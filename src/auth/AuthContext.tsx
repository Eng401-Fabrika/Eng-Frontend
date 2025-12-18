/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { apiRequest } from '../api/client';
import { clearToken, getToken, setToken } from './tokenStorage';
import { getUserFromToken, type JwtUser } from './jwt';

type LoginParams = { email: string; password: string };

type AuthContextValue = {
  token: string | null;
  user: JwtUser | null;
  isAuthenticated: boolean;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(() => getToken());
  const [userState, setUserState] = useState<JwtUser | null>(() => {
    const token = getToken();
    if (!token) return null;
    try {
      return getUserFromToken(token);
    } catch {
      clearToken();
      return null;
    }
  });

  const login = async ({ email, password }: LoginParams) => {
    const data = await apiRequest<{ token: string }>('/api/Auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      token: null,
    });

    setToken(data.token);
    setTokenState(data.token);
    setUserState(getUserFromToken(data.token));
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
    setUserState(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      token: tokenState,
      user: userState,
      isAuthenticated: Boolean(tokenState),
      login,
      logout,
    }),
    [tokenState, userState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
