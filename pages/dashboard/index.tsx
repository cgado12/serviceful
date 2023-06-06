import { Title, Button, Table } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../components/Context/UserContext";

import styles from './index.module.scss';
import { CustomerContext } from "../../components/Context/CustomerContext";
import { JobContext } from "../../components/Context/JobContext";
import moment from "moment";

const Dashboard = () => {
  const router = useRouter()
  const user = useContext(UserContext)
  const { customers } = useContext(CustomerContext) as any;
  const { jobs } = useContext(JobContext) as any;

  const createClient = () => {
   router.push('clients/create')
  }
  const createJob = () => {
    router.push('jobs/create');
  }

  const getClientName = (job: any) => {
    const user: any = Object.values(customers)?.find((c: any) => c.id === job.customerId);
    return `${user?.firstName} ${user?.lastName}`
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
    <div>
      <Title size="20">Upcoming Schedule</Title>
      {jobs && (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Client Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Appointment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(jobs)?.map((job: any, idx: number) => (
              <tr key={`${job?.address}-${idx}`}>
                <td>{job?.title}</td>
                <td>{getClientName(job)}</td>
                <td>{job.address}</td>
                <td>
                {/** @ts-ignore */}
                  {Object.values(customers).find((c: any) => c.id === job.customerId)?.phone || ''}
                </td>
                <td>{`${job?.start ? moment(job.start).format('MM/DD/YYYY') : ''}`}</td>
                <td> {job.amountDue}</td>
                <td>
                  <Button onClick={() => router.push(`${router.asPath}/${job.id}`)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  </div>
);};

export default Dashboard;