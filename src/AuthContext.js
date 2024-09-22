import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const simulateAuthCheck = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000); // Ensure this resolves to `true` if the user is authenticated
    });
  };
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuthState = JSON.parse(localStorage.getItem('isAuthenticated'));
       // console.log('Stored Auth State:', storedAuthState);
    
        if (storedAuthState) {
          const isValid = await simulateAuthCheck();
          console.log('Is Valid:', isValid);
    
          if (isValid) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated'); // Clear invalid state
            localStorage.removeItem('username');
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    
  }, []);

  const login = (props) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('username', props.username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
