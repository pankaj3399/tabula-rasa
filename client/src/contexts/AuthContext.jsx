// client/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (isTokenValid(storedToken)) {
          setCurrentUser(parsedUser);
          // Optionally verify token with the server
          validateTokenWithServer(storedToken).catch(() => {
            logout(); // Logout if token is invalid on the server
          });
        } else {
          logout();
        }
      } catch (parseError) {
        console.error('Error parsing stored user:', parseError);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const isTokenValid = (token) => {
    if (!token || token.length === 0) return false;
    try {
      // Basic JWT validation (assumes token is a JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

  const validateTokenWithServer = async (token) => {
    // Optional: Make a request to the server to validate the token
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/validate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Token validation failed');
    }
    return response.json();
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      console.log('Login request data:', { email, password });
      console.log('API URL:', `${import.meta.env.VITE_API_URL}/auth/login`);
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
      navigate('/dashboard'); // Redirect to dashboard after login
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
      console.log('API URL:', `${import.meta.env.VITE_API_URL}/auth/signup`);
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
      navigate('/dashboard'); // Redirect to dashboard after signup
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to fetch');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Optional: Make a server-side logout request to invalidate the token
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message || 'Failed to logout');
    } finally {
      setCurrentUser(null);
      setError(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/'); // Redirect to landing page after logout
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};