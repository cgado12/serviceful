import React, { createContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Create the Auth Provider component
export const AuthProvider = ({ children, ...contextProps }: any) => {
  console.log(children)
  console.log(contextProps);
 
  return (
    <AuthContext.Provider value={{ ...contextProps.value }}>
      {children}
    </AuthContext.Provider>
  );
};
