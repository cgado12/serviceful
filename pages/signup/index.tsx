import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button } from '@mantine/core';

import { AuthContext } from '../../components/Context/AuthContext';
import img from '../../components/assets/serviceful.png';
import Image from 'next/image';
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
    <div className={styles.logInFormContainer}>
      <div className={styles.logoContainer}>
        <Image alt="" src={img.src} width={250} height={150} />
      </div>
      <form>
        <TextInput
          className={styles.inputBox}
          label="First Name"
          placeholder="Rusty"
          id="firstName"
          required
          radius="md"
          value={formData?.firstName || ''}
          onChange={handleChange}
        />
        <TextInput
          className={styles.inputBox}
          label="Last Name"
          placeholder="Venture"
          id="lastName"
          required
          radius="md"
          value={formData?.lastName || ''}
          onChange={handleChange}
        />
        <TextInput
          className={styles.inputBox}
          label="Organization Name"
          placeholder="Venture Industries"
          id="orgName"
          required
          radius="md"
          value={formData?.orgName || ''}
          onChange={handleChange}
        />

        <TextInput
          className={styles.inputBox}
          label="Address"
          placeholder="Enter your Address"
          id="orgAddress"
          required
          radius="md"
          value={formData?.orgAddress || ''}
          onChange={handleChange}
        />
        <TextInput
          className={styles.inputBox}
          label="Phone"
          placeholder="Enter your phone number"
          id="orgPhone"
          radius="md"
          value={formData?.orgPhone || ''}
          onChange={handleChange}
        />

        <TextInput
          className={styles.inputBox}
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
          className={styles.inputBox}
          label="Password"
          placeholder="Enter your password"
          id="password"
          required
          radius="md"
          value={formData?.password || ''}
          onChange={handleChange}
        />
        <PasswordInput
          className={styles.inputBox}
          label="Password Confirmation"
          placeholder="Enter your password"
          id="passwordConfirm"
          required
          radius="md"
          value={formData?.passwordConfirm || ''}
          onChange={handleChange}
        />

        <div className={styles.buttonContainer}>
          <Button onClick={() => router.push('/login')} variant="outline">
            {' '}
            Login
          </Button>
          <Button
            disabled={
              Object.entries(formData).every(([key, value]) => key && value) &&
              formData.password !== formData.passwordConfirm
            }
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
