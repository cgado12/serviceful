import { useContext, useEffect, useState } from 'react';
import { Button, Table, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { CatalogContext } from '../../components/Context/catalogContext';
import styles from './index.module.scss';
import { JobContext } from '../../components/Context/JobContext';

const Subscriptions = () => {
  const router = useRouter();
  const { catalogs, getCatalogData } = useContext(CatalogContext) as any;
  const { jobs, getJobData } = useContext(JobContext) as any;
  const [subscriptions, setSubscriptions] = useState();

  useEffect(() => {
    setSubscriptions(catalogs);
  }, [catalogs]);

  useEffect(() => {
    getCatalogData();
    getJobData()
  }, [])

  const createSubscription = () => {
    router.push('subscriptions/create');
  };

  const countUsersSubscribed = (plan: any) => {
    let result = 0
    Object?.values(jobs).forEach((j: any) => {
      if (j?.subscriptionId === plan.catalogId) {
        result = result + 1
      }
    });
    return result
    
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <div>
          <Title>Subscription Packages</Title>
          <Title size="md">Create and update your subscription packages</Title>
        </div>
        <Button onClick={createSubscription}>Create Subscription Package</Button>
      </div>

      {subscriptions && (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th># Subscribed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(subscriptions)?.map((plan: any, idx: number) => (
              <tr key={`${plan?.title}-${idx}`}>
                <td>{plan.title}</td>
                <td>{plan.description}</td>
                <td>{countUsersSubscribed(plan)}</td>
                <td>
                  <Button onClick={() => router.push(`${router.asPath}/${plan.id}`)}>View</Button>
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
