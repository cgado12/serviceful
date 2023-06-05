import { Alert, Button, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../hooks/usePocketbase';
import { useEffect, useState } from 'react';

import styles from './[id].module.scss'

const ViewClient = () => {
  const pb = usePocketbase()
  const router = useRouter();
  const [user, setUser] = useState({}) as any

  const { id } = router.query;

  useEffect(() => {

    const getUser = async () => {
      if (id) {
        const response = await pb.collection('customers').getOne(id as string)
        setUser(response)
      }
    }
    getUser()
  }, [])
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <div>
          <Title>Client Information</Title>
        </div>
        <div style={{display: 'flex', gap: '1rem'}}>
          <Button onClick={() => router.back()}>BackPlease!</Button>
          <Button onClick={() => router.push(router.asPath + '/edit')}>Edit</Button>
          <Button onClick={() => alert("Not implemented yet")}>delete</Button>
        </div>
      </div>
      <div>
        {user && (
          <div className={styles.userInfoBox}>
            <div className={styles.displayBox}>
              <Text weight="bold">Name: </Text>
              <Text>{` ${user?.firstName} ${user?.lastName}`}</Text>
            </div>

            <div className={styles.displayBox}>
              <Text weight="bold">Address: </Text>
              <Text>{` ${user?.address}`}</Text>
            </div>

            <div className={styles.displayBox}>
              <Text weight="bold">Phone: </Text>
              <Text>{` ${user?.phone}`}</Text>
            </div>
          </div>
        )}
        ...show jobs and subscription info
      </div>
    </div>
  );};

export default ViewClient;
