import { Button, Card } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../hooks/usePocketbase';
import { useEffect, useState } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

import styles from './[id].module.scss';

const ViewJob = () => {
  const pb = usePocketbase();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>({});
  

  const { id } = router.query;

  useEffect(() => {
    const getSubscription = async () => {
      if (id) {
        const response = await pb.collection('subscriptions').getOne(id as string);
        setSubscription(response);
      }
    };
    getSubscription();
  }, []);



  return (
    <div>
      <Button onClick={() => router.back()}>BackPlease!</Button>Client Name
      <Button onClick={() => router.push(router.asPath + '/edit')}>Edit</Button>
      <Button>delete</Button>
      <div>subscription info info...{subscription.title}</div>
    </div>
  );
};

export default ViewJob;
