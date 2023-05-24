import { Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../components/Context/AuthContext';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('login')
  }

  const goToSignup = () => {
    router.push('signup')
  }
  
  return (
    <div>
      <Button onClick={goToLogin}>Login</Button>
      <Button onClick={goToSignup}>Sign up</Button>
    </div>
  );
}
