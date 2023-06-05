import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../../hooks/usePocketbase';
import { useEffect, useState } from 'react';

const EditJob = () => {
  const pb = usePocketbase();
  const router = useRouter();
  const [job, setJob] = useState({});

  const { id } = router.query;

  useEffect(() => {
    const getJob = async () => {
      if (id) {
        const response = await pb.collection('job').getOne(id as string);
        setJob(response);
      }
    };
    getJob();
  }, []);

  return (
    <div>
      <Button onClick={() => router.back()}>BackPlease!</Button>Job Title
      <Button onClick={() => router.push(router.asPath + '/edit')}>forward!</Button>
    </div>
  );
};

export default EditJob;
