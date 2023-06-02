import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button, Title } from '@mantine/core';

import styles from './create.module.scss';
import { UserContext } from '../../components/Context/UserContext';
import usePocketbase from '../../hooks/usePocketbase';

interface CreateClientFormProps {
  onSubmit: (data: any) => void;
}

const CreateClient: React.FC<CreateClientFormProps> = ({ onSubmit }) => {
  const pb = usePocketbase();
  const router = useRouter();
  const { user } = useContext(UserContext) as { user: any };

  const initialFormData = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    squareCustomerId: 'set in Submit',
    role: ['customer'],
    orgId: user?.record?.orgId[0],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedInfo = { ...formData, [e.currentTarget.id]: e.currentTarget.value };
    setFormData(updatedInfo);
  };

  const handleSubmit = async () => {
    if (Object.entries(formData).every(([key, value]) => key && value)) {
      try {
        let squareResp = await fetch('/api/createClient', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        if (squareResp.statusText === "OK") {
          const body = await squareResp.json()
          formData.squareCustomerId = JSON.parse(body.body).customer.id;
          
          const response = await pb.collection('customers').create(formData);
          router.push(`/clients/${response?.id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.CreateFormContainer}>
      <div>
        <Button onClick={() => router.back()}>BackPlease!</Button>
        <Title>Create Client</Title>
      </div>
      <form>
        <TextInput
          label="First Name"
          placeholder="Rusty"
          id="firstName"
          required
          radius="md"
          value={formData?.firstName || ''}
          onChange={handleChange}
        />
        <TextInput
          label="Last Name"
          placeholder="Venture"
          id="lastName"
          required
          radius="md"
          value={formData?.lastName || ''}
          onChange={handleChange}
        />

        <TextInput
          label="Address"
          placeholder="Enter your Address"
          id="address"
          required
          radius="md"
          value={formData?.address || ''}
          onChange={handleChange}
        />
        <TextInput
          label="Phone"
          placeholder="Enter your phone number"
          id="phone"
          radius="md"
          value={formData?.phone || ''}
          onChange={handleChange}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email or username"
          type="email"
          id="email"
          required
          radius="md"
          value={formData?.email || ''}
          onChange={handleChange}
        />

        <Button
          disabled={!Object.entries(formData).every(([key, value]) => key && value)}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateClient;
