import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button } from '@mantine/core';

import { AuthContext } from '../../components/Context/AuthContext';
import styles from './index.module.scss';

interface SignUpFormProps {
  onSubmit: (data: any) => void;
}

const initialFormData = {
  firstName: '',
  lastName: '',
  orgName: '',
  orgAddress: '',
  orgPhone: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const { isAuthenticated, signUp } = useContext(AuthContext);
  const [formData, setFormData] = useState(initialFormData);

  if (isAuthenticated) {
    router.push('dashboard');
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const updatedInfo = { ...formData, [e.currentTarget.id]: e.currentTarget.value };
    setFormData(updatedInfo);
  };

  const handleSubmit = () => {
    if (Object.entries(formData).every(([key, value]) => key && value)) {
      const { firstName, lastName, email, password,passwordConfirm, ...rest } = formData
      const orgData = { name: rest.orgName, address: rest.orgAddress, phone: rest.orgPhone, email };
      const userData = { firstName, lastName, email, password, passwordConfirm };
      signUp({orgData, userData});
    }
  };

  return (
    <div className={styles.SignUpFormContainer}>
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
          label="Organization Name"
          placeholder="Venture Industries"
          id="orgName"
          required
          radius="md"
          value={formData?.orgName || ''}
          onChange={handleChange}
        />

        <TextInput
          label="Address"
          placeholder="Enter your Address"
          id="orgAddress"
          required
          radius="md"
          value={formData?.orgAddress || ''}
          onChange={handleChange}
        />
        <TextInput
          label="Phone"
          placeholder="Enter your phone number"
          id="orgPhone"
          radius="md"
          value={formData?.orgPhone || ''}
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

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          id="password"
          required
          radius="md"
          value={formData?.password || ''}
          onChange={handleChange}
        />
        <PasswordInput
          label="Password Confirmation"
          placeholder="Enter your password"
          id="passwordConfirm"
          required
          radius="md"
          value={formData?.passwordConfirm || ''}
          onChange={handleChange}
        />

        <Button disabled={ Object.entries(formData).every(([key, value]) => key && value) && formData.password !== formData.passwordConfirm} onClick={handleSubmit}>Log In</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
