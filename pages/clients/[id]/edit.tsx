import { Button, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../../hooks/usePocketbase';
import { useEffect, useState } from 'react';
import { UserInfo } from '../../../components/Context/UserContext';

const EditClient = () => {
  const pb = usePocketbase();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo>();

  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        const response = await pb.collection('customers').getOne(id as string);
        setUser(response as unknown as UserInfo);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <Button onClick={() => router.back()}>BackPlease!</Button>Edit
      {user?.firstName && (<Title>{user.firstName}</Title>)}
    </div>
  );
};

export default EditClient;
