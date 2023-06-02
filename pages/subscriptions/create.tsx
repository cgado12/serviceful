import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button, Title, Select, Checkbox, Card } from '@mantine/core';

import styles from './create.module.scss';
import { UserContext } from '../../components/Context/UserContext';
import usePocketbase from '../../hooks/usePocketbase';

const CreateCatalog: React.FC = () => {
  const pb = usePocketbase();
  const router = useRouter();
  const { user } = useContext(UserContext) as { user: any };

  const initialFormDataForPB = {
    title: '',
    description: '',
    catalogId: '',
    createdBy: [user?.record?.id], // add this
    orgId: [user?.record?.orgId[0]],
  };

  const initialPhase = {
    cadence: 'MONTHLY',
    periods: 1,
    recurringPriceMoney: {
      amount: 0,
      currency: 'USD',
    },
    ordinal: 0,
  };

  const initialCatalogData = {
    id: '',
    type: 'SUBSCRIPTION_PLAN', // Type of the catalog object (in this case, subscription)
    subscriptionPlanData: {
      name: '', // Name of the subscription
      phases: [
        {
          ...initialPhase,
        },
      ],
    },
  };

  const [formData, setFormData] = useState(initialFormDataForPB);
  const [phases, setPhases] = useState([initialPhase]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedInfo = { ...formData, [e.currentTarget.id]: e.currentTarget.value };
    setFormData(updatedInfo);
  };

  const removePhase = (idx: number) => {
    const firstArr = phases.slice(0, idx);
    let secondArr = phases.slice(idx + 1);
    secondArr = secondArr.map((phase, idx) => ({ ...phase, ordinal: firstArr.length + idx }));
    setPhases([...firstArr, ...secondArr]);
  };

  const handleSubmit = async () => {
    phases?.map(
      (phase) => {
          // @ts-ignore
           if (!phase.periods || phase.periods === 0 || phase.periods === '0') {
             phase.periods = 1;
           }
        (phase.recurringPriceMoney.amount = parseInt(`${phase.recurringPriceMoney.amount}00`, 10))
        return phase
      }
    );
    initialCatalogData.subscriptionPlanData.name = formData.title;
    initialCatalogData.subscriptionPlanData.phases = phases;
    initialCatalogData.id = `#${formData.title.replace(' ', '_')}`;



    try {
      const response = await fetch('/api/createCatalog', {
        body: JSON.stringify(initialCatalogData),
        method: 'POST',
      });

      if (response.statusText === 'OK') {
        const body = await response.json();
        const catalog = JSON.parse(body.body);
        formData.catalogId = catalog.catalog_object.id;
        const resp = await pb.collection('subscriptions').create(JSON.stringify(formData));
        router.push(`/subscriptions/${resp.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(phases);

  return (
    <div className={styles.CreateJobContainer}>
      <div>
        <Button onClick={() => router.back()}>BackPlease!</Button>
        <Title>Create Subscription Plan</Title>
      </div>
      <div>Note about phases in a subscription - describe how they work</div>
      <form>
        <TextInput
          label="Title"
          placeholder="Subscription Package Title"
          id="title"
          required
          radius="md"
          value={formData?.title || ''}
          onChange={handleChange}
        />
        <TextInput
          label="Description"
          placeholder="Describe the services for this subscription"
          id="description"
          required
          radius="md"
          value={formData?.description || ''}
          onChange={handleChange}
        />
        Phases for the Subscription:
        <Button
          onClick={() => setPhases([...phases, { ...initialPhase, ordinal: phases.length - 1 }])}
        >
          Add Phase
        </Button>
        {phases.map((phase, idx) => (
          <Card key={`phase-${idx}`}>
            <Button onClick={() => removePhase(idx)}>REMOVE</Button>
            <Select
              label="What interval do you want the customer to pay?"
              description="Please only use whole numbers"
              placeholder="Please pick a subscription cadence"
              value={phase.cadence}
              searchable
              onChange={(value) => {
                phases[idx].cadence = value || 'MONTHLY';
                setPhases([...phases]);
              }}
              data={[
                {
                  value: 'DAILY',
                  label: 'DAILY',
                },
                {
                  value: 'WEEKLY',
                  label: 'WEEKLY',
                },
                {
                  value: 'MONTHLY',
                  label: 'MONTHLY',
                },
                {
                  value: 'QUARTERLY',
                  label: 'QUARTERLY',
                },
                {
                  value: 'ANNUALLY',
                  label: 'ANNUALLY',
                },
              ]}
            />
            <TextInput
              label="How long should the subscription be?"
              placeholder="Please select the number of intervals to use"
              id="frequency"
              description="Set to 1 if there is no end date"
              required
              radius="md"
              value={phase.periods}
              onChange={(e: any) => {
                phases[idx].periods = e.currentTarget.value || 1;
                setPhases([...phases]);
              }}
            />
            <TextInput
              label="How much is this subscription?"
              placeholder="$3.50"
              id="amount"
              required
              radius="md"
              value={phase.recurringPriceMoney.amount.toString()}
              onChange={(e: any) => {
                phases[idx].recurringPriceMoney.amount = e.currentTarget.value;
                setPhases([...phases]);
              }}
            />
          </Card>
        ))}
        <Button
          // disabled={
          //   !Object.entries(formData).every(
          //     ([key, value]) => (key && value) || typeof value === 'boolean'
          //   )
          // }
          onClick={handleSubmit}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCatalog;
