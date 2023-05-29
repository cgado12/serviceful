import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button, Title, Select, Checkbox } from '@mantine/core';

import styles from './create.module.scss';
import { UserContext } from '../../components/Context/UserContext';
import usePocketbase from '../../hooks/usePocketbase';
import { DateTimePicker } from '@mantine/dates';
import { start } from 'repl';

interface CreateJobFormProps {
  onSubmit: (data: any) => void;
}

const CreateJob: React.FC<CreateJobFormProps> = ({ onSubmit }) => {
  const pb = usePocketbase();
  const router = useRouter();
  const { user } = useContext(UserContext) as { user: any };
  const [services, setServices] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(null)
  console.log("user:", user)
  
  const initialFormData = {
    title: '',
    services: '',
    notes: '',
    address: '',
    start: '',
    end: '',
    isJobRecurring: false,
    isPaymentRecurring: false,
    createdBy: [user?.record?.id], // add this
    customerId:'s82lfkp96cco6j8', 
    orgId: [user?.record?.orgId[0]],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (services) {
      setFormData({ ...formData, services: services });
    }
  }, [services])
  
    useEffect(() => {
      if (startDate) {
        const date = (startDate as Date).toString()
        setFormData({ ...formData, start: date, end: date });
      }
    }, [startDate]);
  
  const handleDateChange = (e: any) => {
    console.log(e)
    setStartDate(e)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedInfo = { ...formData, [e.currentTarget.id]: e.currentTarget.value };
    setFormData(updatedInfo);
  };

  const handleSubmit = async () => {
      try {
        const response = await pb.collection('job').create(JSON.stringify(formData));
        console.log(response);
        router.push(`/jobs/${response.id}`);
      } catch (err) {
        console.error(err);
      }
  };

  console.log(formData)

  return (
    <div className={styles.CreateJobContainer}>
      <div>
        <Button onClick={() => router.back()}>BackPlease!</Button>
        <Title>Create Job</Title>
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
          value={services}
          onChange={setServices}
          data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
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
        <DateTimePicker
          valueFormat="DD MMM YYYY hh:mm A"
          label="Pick start date and or time"
          placeholder="Pick date and time"
          maw={400}
          mx="auto"
          value={startDate}
          onChange={handleDateChange}
        />
        <Checkbox label="This job spans multiple days" color="teal" />
        {/* 
         <DateTimePicker
          valueFormat="DD MMM YYYY hh:mm A"
          label="Pick End date and and or time for job"
          placeholder="Pick date and time"
          maw={400}
          mx="auto"
        /> */}
        {/* <TextInput
          label="Start Date and Time"
          placeholder="Enter the date and time esxpected to start the job"
          id="start"
          radius="md"
          value={formData?.start || ''}
          onChange={handleChange}
        />
        <TextInput
          label="End Date and Time"
          placeholder="Enter the date and time expected for the jobs completion"
          id="end"
          required
          radius="md"
          value={formData?.end || ''}
          onChange={handleChange}
        /> */}
        <Button
          disabled={
            !Object.entries(formData).every(
              ([key, value]) => (key && value) || typeof value === 'boolean'
            )
          }
          onClick={handleSubmit}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateJob;
