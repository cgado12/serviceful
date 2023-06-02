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
  const [customers, setCustomers] = useState({});
  const { user } = useContext(UserContext) as { user: { record: { id: string } } } ;
  let data;

  const getCustomerData = async () => {
    data = await pb.collection('customers').getList()
    setCustomers(data?.items);
  };
  useEffect(() => {
    getCustomerData();

  }, [user?.record?.id]);

  return <CustomerContext.Provider value={{ customers: { ...customers }, getCustomerData }}>{children}</CustomerContext.Provider>;
};
