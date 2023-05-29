import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button } from '@mantine/core';

import { AuthContext } from '../../components/Context/AuthContext';
import styles from './index.module.scss';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}


const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const { isAuthenticated, login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({email: '', password: ''})

  if (isAuthenticated) {
    router.push('dashboard');
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedInfo = { ...loginInfo, [e.currentTarget.type]: e.currentTarget.value }
    setLoginInfo(updatedInfo)
  };

  const handleSubmit = () => {
    if (Object.entries(loginInfo).every(([key, value]) => key && value)) {
      login(loginInfo)
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form>
        <TextInput
          label="Email"
          placeholder="Enter your email or username"
          type="email"
          required
          radius="md"
          value={loginInfo?.email || ''}
          onChange={handleChange}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          radius="md"
          value={loginInfo?.password || ''}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit}>Log In</Button>
      </form>
    </div>
  );
};

export default LoginForm;
