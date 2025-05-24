import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CredentialResponse } from '@react-oauth/google';

interface GoogleJwtPayload {
  sub: string;
  name: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
  aud?: string;
  iss?: string;
  exp?: number;
  iat?: number;
}

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
  googleLogin: (response: CredentialResponse) => Promise<void>;
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
    try {
      // In a real implementation, we would validate the password here
      if (!password) {
        throw new Error('Password is required');
      }
      
      const mockUser: User = {
        id: '1',
        name: 'Jane Doe',
        email: email,
        role: 'recruiter',
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    try {
      // In a real implementation, we would validate and hash the password here
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        role: 'recruiter',
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const googleLogin = async (response: CredentialResponse): Promise<void> => {
    try {
      if (response.credential) {
        const decoded: GoogleJwtPayload = jwtDecode<GoogleJwtPayload>(response.credential);

        const googleUser: User = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          role: 'recruiter', // Default or based on email domain
        };

        setUser(googleUser);
        setIsAuthenticated(true);
        localStorage.setItem('auth_token', response.credential);
      } else {
        throw new Error('Google credential missing');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;