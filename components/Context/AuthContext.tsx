import React, { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
  signUp: (data: any) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: (data: any) => {},
  logout: () => { },
  signUp: (data:any) => {}
});

// Create the Auth Provider component
// export const AuthProvider = ({ children, ...contextProps }: any) => {
//   const [authInfo, setAuthInfo] = useState()

//   console.log(contextProps);
  
//   useEffect(() => {
    
//     setAuthInfo(contextProps.value)
//   })
 
//   return (
//     <AuthContext.Provider value={{ ...contextProps.value }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
