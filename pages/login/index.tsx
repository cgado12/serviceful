import { ChangeEvent, useContext, useEffect, useState } from 'react';
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

    useEffect(() => {
      const keyDownHandler = (event: any) => {
        console.log(event)
        if (event.key === 'Enter') {
          // event.preventDefault();

          // 👇️ call submit function here
          console.log(event.key)
          // handleSubmit(); <-- TODO: this doesnt work consistently?
          document.getElementById('loginBtn')?.click();
        }
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedInfo = { ...loginInfo, [e.currentTarget.type]: e.currentTarget.value }
    setLoginInfo(updatedInfo)
  };

  const handleSubmit = async () => {
    if (Object.entries(loginInfo).every(([key, value]) => key && value)) {
      console.log("shouldLogin")
      await login(loginInfo)
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

        <Button id="loginBtn" onClick={handleSubmit}>Log In</Button>
      </form>
    </div>
  );
};

export default LoginForm;
