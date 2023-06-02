import { useContext, useEffect, useState } from 'react';
import { Button, Table, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { CatalogContext } from '../../components/Context/catalogContext';

const Subscriptions = () => {
  const router = useRouter();
  const { catalogs } = useContext(CatalogContext) as any;
  const [subscriptions, setSubscriptions] = useState();

  useEffect(() => {
    setSubscriptions(catalogs);
  }, [catalogs]);

  const createSubscription = () => {
    router.push('subscriptions/create');
  };

  return (
    <div>
      <Title>Subscription packages</Title>
      <Title size="md">Create and update your subscription packages</Title>
      <Button onClick={createSubscription}>New Subscription Package</Button>

      {subscriptions && (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Subscribed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(subscriptions)?.map((plan: any, idx: number) => (
              <tr key={`${plan?.title}-${idx}`}>
                <td>{plan.title}</td>
                <td>{plan.description}</td>
                <td>Comming soon...</td>
                <td>
                  <Button onClick={() => router.push(`${router.asPath}/${plan.id}`)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Subscriptions;
