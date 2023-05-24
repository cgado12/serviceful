import { Button } from '@mantine/core';
import router from 'next/router';

const CreateJob = () => (
  <div>
    <Button onClick={() => router.back()}>BackPlease!</Button>CreateJob
    viewing some Jobs info
  </div>
);

export default CreateJob;
