import { createContext, useContext, useState, ReactNode } from 'react';
import { router } from 'expo-router';

type AuthContextType = {
  isLoggedIn: boolean;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) return;

    setIsLoggedIn(true);
    router.replace('/auth/welcome');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.replace('/auth/goodbye');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
