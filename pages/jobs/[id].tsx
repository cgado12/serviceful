import { Button, Card, Select, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../hooks/usePocketbase';
import { useContext, useEffect, useState } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

import styles from './[id].module.scss';
import { CatalogContext } from '../../components/Context/catalogContext';
import { CustomerContext } from '../../components/Context/CustomerContext';
import { JobContext } from '../../components/Context/JobContext';

const ViewJob = () => {
  const pb = usePocketbase();
  const router = useRouter();
  const { catalogs: catalogItems } = useContext(CatalogContext) as any;
  const { customers } = useContext(CustomerContext) as any;
  const { jobs } = useContext(JobContext) as any;
  const [job, setJob] = useState<any>({});
  const [collectPayment, setCollectPaymnt] = useState(false);
  const [shouldAddSubscription, setShouldAddSubscription] = useState(false);
  const [subscription, setSubscription] = useState<string | null>(null);

  const [paymentLink, setPaymentLink] = useState('')

  const { id } = router.query;

  useEffect(() => {
    const getJob = async () => {
      if (id) {
        let j = Object.values(jobs).find((j: any) => j.id === id);
        if (!j) {
          const response = await pb.collection('job').getOne(id as string);
          j = response;
        }
        setJob(j);
      }
    };
    getJob();
  }, []);

  const finalizeJob = () => {
    setCollectPaymnt(!collectPayment);
  };

  const sendPaymentLink = async () => {
    const response = await fetch('/api/sendPaymentLink', {
      method: 'POST',
      body: JSON.stringify(job),
    });
    const body = await response.json();
    const obj = JSON.parse(body.body);

    setPaymentLink(obj?.payment_link?.url)
    
    let phoneNumber = Object.values(customers).find((c: any) => c.id === job.customerId)
    // @ts-ignore
    phoneNumber = phoneNumber?.phone
    const resp = await fetch('/api/sendPaymentText', {
      method: 'POST',
      body: JSON.stringify({
        ...job, ...obj, phoneNumber
      }),
    });
  };

  const addSubscription = async () => {
    const catalog = Object.values(catalogItems).find((ci: any) => ci.title === subscription) as any;
    const customer = Object.values(customers).find((c: any) => c.id === job.customerId) as any;

    const data = {
      subscriptionId: catalog?.catalogId,
      customerId: {
        squareCustomerId: customer?.squareCustomerId,
      },
      start: job.start,
    };
    const response = await fetch('/api/createSubscription', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.statusText === 'OK') {
      const body = await response.json();
      const subscriptionObj = JSON.parse(body.body);
      job.catalogId = subscriptionObj.plan_id;
      const resp = await pb.collection('subscriptions').create(JSON.stringify(job));
      router.push(`/subscriptions/${resp.id}`);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <div className={styles.headerContainer}>
          <Title>Job Information</Title>
          <div>
            <Button onClick={() => router.back()}>BackPlease!</Button>
            <Button onClick={() => router.push(router.asPath + '/edit')}>Edit</Button>
            <Button onClick={() => alert("Not implemented yet")}>Delete</Button>
          </div>
        </div>
        <Button
          style={{
            marginBottom: 40,
          }}
          onClick={() => pb.collection('job').update(job.id, { ...job, jobStatus: 'complete' })}
        >
          Mark as Complete
        </Button>
      </div>
      {job && (
        <div>
          <div className={styles.userInfoBox}>
            <div className={styles.displayBox}>
              <Text weight="bold">Name: </Text>
              <Text>{` ${job?.title} `}</Text>
            </div>

            <div className={styles.displayBox}>
              <Text weight="bold">Address: </Text>
              <Text>{` ${job?.address}`}</Text>
            </div>

            <div className={styles.displayBox}>
              <Text weight="bold">Notes: </Text>
              <Text>{` ${job?.notes}`}</Text>
            </div>

            <div className={styles.displayBox}>
              <Text weight="bold">Status: </Text>
              <Text>{` ${job?.jobStatus}`}</Text>
            </div>
          </div>
        </div>
      )}
      <Text style={{
        marginTop: 20
      }}>...show some user and subscription info</Text>
      <div className={styles.paymentContainer}>
        <Button onClick={sendPaymentLink}>Send Payment Link</Button>

        <Button onClick={() => setShouldAddSubscription(!shouldAddSubscription)}>
          Add to Subscription
        </Button>
        {shouldAddSubscription && (
          <>
            <Select
              label="Please assign a subscription"
              placeholder="Pick a subscription"
              value={subscription}
              searchable
              onChange={setSubscription}
              data={Object.values(catalogItems).map((c: any) => ({
                value: c.title,
                label: c.title,
              }))}
            />
            <Button onClick={addSubscription}>Add</Button>
          </>
        )}

        <Button onClick={finalizeJob}>Take fixed payment</Button>
        {collectPayment && (
          <Card shadow="xs" padding="lg" className={styles.cardContainer}>
            <PaymentForm
              applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID || ''}
              locationId="L70D7SSS832FY"
              cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                if (token && token.status === 'OK') {
                  const body = { ...token, price: job?.amountDue };
                  const data = await fetch('/api/createFixedPayment', {
                    body: JSON.stringify(body),
                    method: 'POST',
                  });
                  if (data.statusText === 'OK') {
                    await pb.collection(job).update(job.id, { ...job, isPaid: true });
                  }
                }
              }}
            >
              <CreditCard />
            </PaymentForm>
          </Card>
        )}
        {paymentLink && (
          <a href={paymentLink} target="_blank">
            <Text>Click Here to pay!</Text>
          </a>
        )}
      </div>
    </div>
  );
};

export default ViewJob;
