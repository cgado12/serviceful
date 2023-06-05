import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import usePocketbase from '../../hooks/usePocketbase';

interface CatalogContextProps {}

export const CatalogContext = createContext<CatalogContextProps>({});

export type Jobs = Array<{}>;

// Create the User Provider component
export const CatalogProvider = ({ children }: any) => {
  const pb = usePocketbase();
  const [catalogs, setCatalogs] = useState({});
  const { user } = useContext(UserContext) as { user: { record: { id: string } } };
  let data;
  const getCatalogData = async () => {
    data = await pb.collection('subscriptions').getList();
    setCatalogs(data?.items);
  };

  useEffect(() => {
    getCatalogData();
  }, [user?.record?.id]);

  return <CatalogContext.Provider value={{ catalogs: {...catalogs} , getCatalogData }}>{children}</CatalogContext.Provider>;
};
