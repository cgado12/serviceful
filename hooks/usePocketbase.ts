import PocketBase from 'pocketbase';
import { useEffect } from 'react';

const usePocketbase = () => {
  const pb = new PocketBase('http://127.0.0.1:8090');

  useEffect(() => {
    // update the store with the parsed data from the cookie string
    pb.authStore.loadFromCookie('pb_auth=...');

    // exports the store data as cookie, with option to extend the default SameSite, Secure, HttpOnly, Path and Expires attributes
    pb.authStore.exportToCookie({ httpOnly: false });
    // triggered everytime on store change
    const removeListener1 = pb.authStore.onChange((token, model) => {
      console.log('New store data 1:', token, model);
    });

    // triggered once right after registration and everytime on store change
    const removeListener2 = pb.authStore.onChange((token, model) => {
      console.log('New store data 2:', token, model);
    }, true);

    // (optional) removes the attached listeners
    return () => {
      removeListener1();
      removeListener2();
    };
  }, []);

  return pb;
};

export default usePocketbase;
