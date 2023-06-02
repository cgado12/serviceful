import { useContext, useEffect, useState } from 'react';
import { Button, Table, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { JobContext } from '../../components/Context/JobContext';
import moment from 'moment';

const Subscriptions = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState({id: "hello"})

  const createSubscription = () => {
    router.push('subscriptions/create');
  };

  return (
    <div>
      <Title>Subscription packages</Title>
      <Title size="md">Create and update your subscription packages</Title>
      <Button onClick={createSubscription}>New Subscription Package</Button>
      {subscriptions && <>subscriptions.id</>}
    </div>
  );
};

export default Subscriptions;
