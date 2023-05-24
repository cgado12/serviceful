import { Button } from "@mantine/core";
import router from 'next/router';

const CreateJob = () => (
  <div>
    <Button onClick={() => router.back()}>BackPlease!</Button>CreateJob
  </div>
);

export default CreateJob;
