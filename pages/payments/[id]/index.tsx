import { Button } from '@mantine/core';
import router from 'next/router';

const CreatePayment = () => (
  <div>
    <Button onClick={() => router.back()}>BackPlease!</Button>CreatePayment
    viewing some Payments info
  </div>
);

export default CreatePayment;
