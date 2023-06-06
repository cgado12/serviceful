import { Button, Card, Checkbox, Divider, Select, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import usePocketbase from '../../hooks/usePocketbase';
import { useContext, useEffect, useState } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

import styles from './[id].module.scss';
import { CatalogContext } from '../../components/Context/catalogContext';
import { CustomerContext } from '../../components/Context/CustomerContext';
import { JobContext } from '../../components/Context/JobContext';
import { Currency } from 'tabler-icons-react';

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
  const [useJobPrice, setUseJobPrice] = useState(false);
  const [assignedSubscription, setAssignedSubscription] = useState < any |undefined>(undefined);

  const [paymentLink, setPaymentLink] = useState('');

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
    if (jobs) {
      getJob();
    }
  }, []);

  useEffect(() => {
    const getSubscripttion = async () => {
      const response = await fetch('/api/getSubscription', {
        method: 'POST',
        body: JSON.stringify({ id: job?.subscriptionPlanId }),
      });
      const body = await response.json();
      const obj = JSON.parse(body.body);
      setAssignedSubscription(obj);
    };

    if (job.subscriptionPlanId) {
      getSubscripttion();
    }
  }, [job]);

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

    setPaymentLink(obj?.payment_link?.url);

    let phoneNumber = Object.values(customers).find((c: any) => c.id === job.customerId);
    // @ts-ignore
    phoneNumber = phoneNumber?.phone;
    const resp = await fetch('/api/sendPaymentText', {
      method: 'POST',
      body: JSON.stringify({
        ...job,
        ...obj,
        phoneNumber,
      }),
    });
  };

  const addSubscription = async () => {
    const catalog = Object.values(catalogItems).find((ci: any) => ci.title === subscription) as any;
    const customer = Object.values(customers).find((c: any) => c.id === job.customerId) as any;
    let priceOverride = undefined;
    if (useJobPrice) {
      priceOverride = {
        amount: job.amountDue,
        Currency: 'USD',
      };
    }
    const data = {
      subscriptionId: catalog?.catalogId,
      customerId: {
        squareCustomerId: customer?.squareCustomerId,
      },
      start: job.start,
      priceOverrideMoney: priceOverride,
    };

    const response = await fetch('/api/createSubscription', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.statusText === 'OK') {
      const body = await response.json();
      const subscriptionObj = JSON.parse(body.body);
      job.catalogId = subscriptionObj.plan_id;
      job.subscriptionPlanId = subscriptionObj.id;
      const resp = await pb.collection('subscriptions').create(JSON.stringify(job));
      router.push(`/subscriptions/${resp.id}`);
    }
  };

    const getCustomerName = () => {
      const user: any = Object.values(customers)?.find((c: any) => c.id === job.customerId);
      return `${user?.firstName} ${user?.lastName}`;
    };

  return (
    <div className={styles.pageContainer}>
      <div>
        <div className={styles.headerContainer}>
          <Title>Job Information</Title>
          <div>
            <Button onClick={() => router.back()}>BackPlease!</Button>
            <Button onClick={() => router.push(router.asPath + '/edit')}>Edit</Button>
            <Button onClick={() => alert('Not implemented yet')}>Delete</Button>
          </div>
        </div>
        <Divider />
        <div style={{ marginTop: 30 }}>
          <Button
            style={{
              marginBottom: 40,
            }}
            onClick={() => pb.collection('job').update(job.id, { ...job, jobStatus: 'complete' })}
          >
            Mark as Complete
          </Button>
          <Button onClick={sendPaymentLink}>Send Payment Link</Button>
          {assignedSubscription && (
            <Button
              onClick={async () => {
                const response = await fetch('/api/pauseSubscription', {
                  method: 'POST',
                  body: JSON.stringify({ id: job.subscriptionPlanId }),
                });
                const body = await response.json();
                const obj = JSON.parse(body.body);
                setAssignedSubscription({ ...obj });
              }}
            >
              Pause Subscription
            </Button>
          )}
          {assignedSubscription && assignedSubscription?.subscription?.status === 'PAUSED' && (
            <Button
              onClick={async () => {
                const response = await fetch('/api/resumeSubscription', {
                  method: 'POST',
                  body: JSON.stringify({ id: job.subscriptionPlanId }),
                });
                const body = await response.json();
                const obj = JSON.parse(body.body);
                setAssignedSubscription({ ...obj });
              }}
            >
              Resume Subscription
            </Button>
          )}
        </div>
      </div>
      {job && (
        <div>
          <div className={styles.userInfoBox}>
            <div className={styles.displayBox}>
              <Text weight="bold">Name: </Text>
              <Text>{` ${job?.title} `}</Text>
            </div>

            <div className={styles.displayBox}>
              <Text weight="bold">Customer Name: </Text>
              <Text>{getCustomerName()}</Text>
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
      <Text
        style={{
          marginTop: 20,
        }}
      >
        <div>...show some user and subscription info</div>
        {job?.subscriptionId && (
          <>
            <Text>
              Part of subscription with: catalogId: {job.subscriptionId}, subscriptionPlan:{' '}
              {job?.subscriptionPlanId}
            </Text>
          </>
        )}
        {assignedSubscription && (
          <Text>
            <div>
              Subscription Name in Square: {assignedSubscription?.subscription?.source?.name}
            </div>
            <div>Subscription Status in Square: {assignedSubscription?.subscription?.status}</div>
          </Text>
        )}
      </Text>

      <div className={styles.paymentContainer}>
        {!assignedSubscription && (
          <Button onClick={() => setShouldAddSubscription(!shouldAddSubscription)}>
            Add to Subscription
          </Button>
        )}
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

            <Checkbox
              style={{ marginTop: 30 }}
              label="Override the subscription price?"
              color="teal"
              checked={useJobPrice}
              onChange={() => {
                setUseJobPrice(!useJobPrice);
              }}
            />

            <Button onClick={addSubscription}>Add</Button>
          </>
        )}

        <Button style={{ marginTop: 30 }} onClick={finalizeJob}>
          Take fixed payment
        </Button>
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
