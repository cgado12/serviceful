import { Title, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../components/Context/UserContext";

import styles from './index.module.scss';

const Dashboard = () => {
  const router = useRouter()
  const user = useContext(UserContext)

  const createClient = () => {
   router.push('clients/create')
  }
  const createJob = () => {
    router.push('jobs/create');
  }



return (
  <div className={styles.pageContainer}>
    
    <div className={styles.headerContainer}>
      <div>
        <Title>Dashboard</Title>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={createClient}>New Client</Button>
        <Button onClick={createJob}>New Job</Button>
      </div>
    </div>

  </div>
);};

export default Dashboard;