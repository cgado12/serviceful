import { Button } from '@mantine/core';
import router from 'next/router';

const CreateClient = () => (
  <div>
    <Button onClick={() => router.back()}>BackPlease!</Button>CreateClient
    viewing some clients info
  </div>
);

export default CreateClient;
