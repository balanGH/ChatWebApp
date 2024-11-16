import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
        setIsAuthenticated(1); // Set authenticated state
        localStorage.setItem('token', data.token); // Store token
        return true; // Return success
      } else {
        return false; // Return failure
      }
    } catch (error) {
      console.error('Login failed', error);
      return false; // Return failure
    }
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
