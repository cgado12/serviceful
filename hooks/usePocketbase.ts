/* eslint-disable import/no-cycle */
import PocketBase from 'pocketbase';
import { useEffect } from 'react';
// import { CatalogContext } from '../components/Context/catalogContext';
// import { CustomerContext } from '../components/Context/CustomerContext';
// import { JobContext } from '../components/Context/JobContext';

const usePocketbase = () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  // const { getCatalogData } = useContext(CatalogContext) as any;
  // const { getCustomerData } = useContext(CustomerContext) as any;
  // const { getJobData } = useContext(JobContext) as any;

  useEffect(() => {
    // update the store with the parsed data from the cookie string
    pb.authStore.loadFromCookie('pb_auth=...');

    // exports the store data as cookie, with option to extend the default SameSite, Secure, HttpOnly, Path and Expires attributes
    pb.authStore.exportToCookie({ httpOnly: false });

    pb.afterSend = async (response) => {
      if (response.statusText === 'OK') {
        // await getCatalogData();
        // await getCustomerData();
        // await getJobData();
      }
      return response;
    };
  }, []);

  return pb;
};

export default usePocketbase;
