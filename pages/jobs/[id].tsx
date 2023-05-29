import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../hooks/usePocketbase';
import { useEffect, useState } from 'react';

const ViewJob = () => {
  const pb = usePocketbase();
  const router = useRouter();
  const [job, setJob] = useState({});

  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        const response = await pb.collection('job').getOne(id as string);
        setJob(response);
      }
    };
    getUser();
  }, []);

  console.log(job);

  return (
    <div>
      <Button onClick={() => router.back()}>BackPlease!</Button>Client Name
      <Button onClick={() => router.push(router.asPath + '/edit')}>forward!</Button>
    </div>
  );
};

export default ViewJob;
