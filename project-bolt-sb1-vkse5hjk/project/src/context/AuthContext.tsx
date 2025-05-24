import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'hiring_manager';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    // This would typically call an API
    try {
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Jane Doe',
        email: email,
        role: 'recruiter',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      // Store auth token in localStorage
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    // This would typically call an API
    try {
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        role: 'recruiter',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      // Store auth token in localStorage
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};