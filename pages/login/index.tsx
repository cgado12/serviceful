import { Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../components/Context/AuthContext';
import { useRouter } from 'next/router';

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter()

  if (isAuthenticated) {
    router.push('dashboard')
  }
    return (
      <div>
        <Button
          onClick={() => {
            console.log(login);
            login();
            // router.push('dashboard')
          }}
        />
      </div>
    );
};

export default Login;
