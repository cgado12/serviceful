import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button } from '@mantine/core';

import { AuthContext } from '../../components/Context/AuthContext';
import styles from './index.module.scss';
import img from '../../components/assets/serviceful.png';
import Image from 'next/image';

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

  const goToLogin = () => {
    router.push('signup');
  };

  return (
    <div className={styles.loginPageContainer}>
      <div>
        <Image alt="" src={img.src} width={250} height={150} />
      </div>
      <form>
        <TextInput
          className={styles.inputBox}
          label="Email"
          placeholder="Enter your email or username"
          type="email"
          required
          radius="md"
          value={loginInfo?.email || ''}
          onChange={handleChange}
        />

        <PasswordInput
          className={styles.inputBox}
          label="Password"
          placeholder="Enter your password"
          required
          radius="md"
          value={loginInfo?.password || ''}
          onChange={handleChange}
        />

        <div className={styles.buttonContainer}>
          <Button variant='outline' onClick={goToLogin}>Sign Up</Button>
          <Button id="loginBtn" onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
