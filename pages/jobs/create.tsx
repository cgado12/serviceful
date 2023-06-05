import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button, Title, Select, Checkbox } from '@mantine/core';

import styles from './create.module.scss';
import { UserContext } from '../../components/Context/UserContext';
import usePocketbase from '../../hooks/usePocketbase';
import { DateTimePicker } from '@mantine/dates';
import { CustomerContext } from '../../components/Context/CustomerContext';
import { CatalogContext } from '../../components/Context/catalogContext';

interface CreateJobFormProps {
  onSubmit: (data: any) => void;
}

const CreateJob: React.FC<CreateJobFormProps> = ({ onSubmit }) => {
  const pb = usePocketbase();
  const router = useRouter();
  const { user } = useContext(UserContext) as { user: any };
  const { customers } = useContext(CustomerContext) as { customers: { user: any } };
  const {catalogs: catalogItems} = useContext(CatalogContext) as any;
  const [subscription, setSubscription] = useState < string| null>(null);
  const [client, setClient] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [spansDays, setSpansDays] = useState(false);
  const [isJobRecurring, setIsJobRecurring] = useState(false);
  const [isPaymentRecurring, setIsPaymentRecurring] = useState(false);

  const initialFormData = {
    title: '',
    notes: '',
    address: '',
    start: '',
    end: '',
    amountDue: '',
    jobStatus: 'pending',
    isJobRecurring: false,
    isPaymentRecurring: false,
    subscriptionId: '',
    createdBy: [user?.record?.id], // add this
    customerId: '',
    orgId: [user?.record?.orgId[0]],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (client) {
      const cId = Object.values(customers).find((c) => client.includes(c.address));
      setFormData({ ...formData, customerId: cId});
    }
  }, [client]);

  useEffect(() => {
    if (subscription) {
      const sId = Object.values(catalogItems).find((c: any) => subscription.includes(c.title) && c.id);
      setFormData({ ...formData, subscriptionId: (sId as any).catalogId });
    }
  }, [subscription]);

  useEffect(() => {
    if (startDate) {
      const date = (startDate as Date).toString();
      setFormData({ ...formData, start: date, end: !isJobRecurring ? date: '' });
    }
  }, [startDate]);

    useEffect(() => {
      if (endDate) {
        const date = (endDate as Date).toString();
        setFormData({ ...formData, end: date });
      }
    }, [endDate]);
  
  useEffect(() => {
    setFormData({ ...formData, isJobRecurring });
  }, [isJobRecurring])

    useEffect(() => {
      setFormData({ ...formData, isPaymentRecurring });
    }, [isPaymentRecurring]);

  const handleStartDateChange = (e: any) => {
    setStartDate(e);
  };
  const handleEndDateChange = (e: any) => {
    setEndDate(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedInfo = { ...formData, [e.currentTarget.id]: e.currentTarget.value };
    setFormData(updatedInfo);
  };

  const handleSubmit = async () => {
    try {
      if (isPaymentRecurring) {
        await fetch('/api/createSubscription', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      const data = {...formData, customerId: (formData.customerId as any)?.id, start: new Date(formData.start), end: new Date(formData.end)}
      
      const response = await pb.collection('job').create(JSON.stringify(data));
      
      router.push(`/jobs/${response.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{padding: 40}} className={styles.CreateJobContainer}>
      <div className={styles.headerContainer}>
        <Title>Create Job</Title>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <form>
        <TextInput
          label="Title"
          placeholder="job title"
          id="title"
          required
          radius="md"
          value={formData?.title || ''}
          onChange={handleChange}
        />
        <Select
          label="Select the customer for this job"
          placeholder="Pick one"
          value={client}
          searchable
          onChange={setClient}
          data={Object.values(customers).map((c) => ({
            value: `${c.firstName} ${c.lastName} - ${c.address}`,
            label: `${c.firstName} ${c.lastName} - ${c.address}`,
          }))}
        />
        <TextInput
          label="Job Notes"
          placeholder="the yarn is 2 acres."
          id="notes"
          required
          radius="md"
          value={formData?.notes || ''}
          onChange={handleChange}
        />
        <TextInput
          label="Address"
          placeholder="Enter the job site Address"
          id="address"
          required
          radius="md"
          value={formData?.address || ''}
          onChange={handleChange}
        />
        <TextInput
          label="Price"
          placeholder="Enter the amount due for job completion"
          id="amountDue"
          required
          radius="md"
          value={formData?.amountDue || ''}
          onChange={handleChange}
        />
        <DateTimePicker
          valueFormat="DD MMM YYYY hh:mm A"
          label="Pick start date and time"
          placeholder="Pick date and time"
          maw={400}
          mx="auto"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <Checkbox
          style={{ marginTop: 30 }}
          label="Does this job spans multiple days"
          color="teal"
          checked={spansDays}
          onChange={() => {
            setIsJobRecurring(!spansDays);
            setSpansDays(!spansDays);
          }}
        />
        {spansDays && (
          <DateTimePicker
            valueFormat="DD MMM YYYY hh:mm A"
            label="Pick end date and time"
            placeholder="Pick date and time"
            maw={400}
            mx="auto"
            value={endDate}
            onChange={handleEndDateChange}
          />
        )}

        <Checkbox
          style={{ marginTop: 30 }}
          label="Does this job have a recurring payment? Would you like to make this a subscription?"
          color="teal"
          checked={isPaymentRecurring}
          onChange={() => {
            setIsPaymentRecurring(!isPaymentRecurring);
          }}
        />
        {isPaymentRecurring && (
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
        )}

        <Button style={{ marginTop: 30 }} onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateJob;
