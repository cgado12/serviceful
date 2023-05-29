import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import usePocketbase from '../../hooks/usePocketbase';

interface CustomerContextProps {}

export const CustomerContext = createContext<CustomerContextProps>({});

export type Customers = Array<{
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  orgId: string[];
}>;

// Create the User Provider component
export const CustomerProvider = ({ children }: any) => {
  const pb = usePocketbase();
  const [Customers, setCustomers] = useState({});
  const { user } = useContext(UserContext) as { user: { record: { id: string } } } ;
  console.log('userrrr', user);

  useEffect(() => {
    let data;
    const customerData = async () => {
      data = await pb.collection('customers').getList()
      console.log("provider!!",data.items)
      setCustomers(data?.items);
    };
    customerData();

    
    console.log('customer:', data);
  }, [user?.record?.id]);

  return <CustomerContext.Provider value={{ ...Customers }}>{children}</CustomerContext.Provider>;
};
