import axios from 'axios';
import { useEffect } from 'react';
// import { CatalogContext } from '../components/Context/catalogContext';
// import { CustomerContext } from '../components/Context/CustomerContext';
// import { JobContext } from '../components/Context/JobContext';

const useAxios = () => {
  // const { getCatalogData } = useContext(CatalogContext) as any;
  // const { getCustomerData } = useContext(CustomerContext) as any;
  // const { getJobData } = useContext(JobContext) as any;
  useEffect(() => {
    axios.interceptors.response.use(async (response: any) => {
      if (response.statusText === 'OK') {
        // await getCatalogData();
        // await getCustomerData();
        // await getJobData();
      }
      return response;
    });
  });

  return axios;
};

export default useAxios;
