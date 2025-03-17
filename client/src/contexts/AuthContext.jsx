import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (isTokenValid(storedToken)) {
            setCurrentUser(parsedUser);
            console.log('Token restored and valid:', storedToken);
          } else {
            console.log('Token expired or invalid, logging out');
            logout();
          }
        } catch (parseError) {
          console.error('Error parsing stored user:', parseError);
          logout();
        }
      } else {
        console.log('No stored user or token found');
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const isTokenValid = (token) => {
    if (!token || token.length === 0) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      const isValid = Date.now() < expiry;
      console.log('Token expiry check:', { now: Date.now(), expiry, isValid });
      return isValid;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      console.log('Login request data:', { email, password });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Login failed:', data);
        setError(data.message || 'Login failed');
        throw new Error(data.message || 'Login failed');
      }

      setCurrentUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      console.log('Login successful, token stored:', data.token);
      navigate('/dashboard');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to fetch');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setError(null);
    setLoading(true);
    try {
      console.log('Signup request data:', { email, password, name });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Signup failed:', data);
        setError(data.message || 'Signup failed');
        throw new Error(data.message || 'Signup failed');
      }

      setCurrentUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      console.log('Signup successful, token stored:', data.token);
      navigate('/dashboard');
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to fetch');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out');
    setCurrentUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};