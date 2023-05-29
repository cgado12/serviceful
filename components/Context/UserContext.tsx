import React, { createContext, useEffect, useState } from 'react';

interface UserContextProps {
}

export const UserContext = createContext<UserContextProps>({});


export type UserInfo = {
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  orgId: string[]
}

// Create the User Provider component
export const UserProvider = ({ children, ...contextProps }: any) => {
  const [userInfo, setUserInfo] = useState<UserInfo>()

  useEffect(() => {
    setUserInfo(contextProps.value)
  },[contextProps.value])

  return (
    <UserContext.Provider value={{ ...userInfo }}>
      {children}
    </UserContext.Provider>
  );
};
