import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import usePocketbase from '../../hooks/usePocketbase';

interface JobContextProps {}

export const JobContext = createContext<JobContextProps>({});

export type Jobs = Array<{
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  orgId: string[];
}>;

// Create the User Provider component
export const JobProvider = ({ children }: any) => {
  const pb = usePocketbase();
  const [jobs, setJobs] = useState({});
  const { user } = useContext(UserContext) as { user: { record: { id: string } } };

  useEffect(() => {
    let data;
    const jobData = async () => {
      data = await pb.collection('job').getList();
      setJobs(data?.items);
    };
    jobData();
  }, [user?.record?.id]);

  return <JobContext.Provider value={{ ...jobs }}>{children}</JobContext.Provider>;
};
