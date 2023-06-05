import { Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../components/Context/AuthContext';
import { useRouter } from 'next/router';

import styles from 'index.module.scss'
import Image from 'next/image';
import img from '../components/assets/serviceful.png'

export default function HomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('login')
  }

  const goToSignup = () => {
    router.push('signup')
  }
  
  return (
    <div className={styles.homeContainer}>
      <div>
        <Image alt="" src={img.src} width={250} height={150} />
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={goToLogin}>Login</Button>
        <Button onClick={goToSignup}>Sign up</Button>
      </div>
    </div>
  );
}
