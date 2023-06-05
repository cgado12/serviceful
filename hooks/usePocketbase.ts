import PocketBase from 'pocketbase';
import { useEffect } from 'react';

const usePocketbase = () => {
  let origin = '';
  if (typeof window !== 'undefined') {
    origin = window.location.hostname;
  }
  const pb = new PocketBase(`http://${origin}:8090`);

  useEffect(() => {
    pb.authStore.loadFromCookie('pb_auth=...');
    pb.authStore.exportToCookie({ httpOnly: false });
  }, []);

  return pb;
};

export default usePocketbase;
