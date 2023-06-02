import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../hooks/usePocketbase';
import { useEffect, useState } from 'react';

const ViewClient = () => {
  const pb = usePocketbase()
  const router = useRouter();
  const [user, setUser] = useState({})

  const { id } = router.query;
  console.log(id)

  useEffect(() => {

    const getUser = async () => {
      if (id) {
        const response = await pb.collection('customers').getOne(id as string)
        setUser(response)
      }
    }
    getUser()
  }, [])

  console.log(user)
  
  return (
    <div>
      <Button onClick={() => router.back()}>BackPlease!</Button>Client Name
      <Button onClick={() => router.push(router.asPath + '/edit')}>Edit</Button>
      <Button>delete</Button>

      <div>
        show info and jobs table with connection to view job 
      </div>
    </div>
  );};

export default ViewClient;
