import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create an Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Set up the default Authorization header
const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAuthHeader(parsedUser.token); // Set token if user exists
    }
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await apiLogin(email, password);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthHeader(userData.token); // Set token after login
  };

  const register = async (name: string, email: string, password: string) => {
    const userData = await apiRegister(name, email, password);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthHeader(userData.token); // Set token after registration
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    localStorage.removeItem('user');
    setAuthHeader(null); // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
