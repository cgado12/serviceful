import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../../components/Context/CustomerContext';
import usePocketbase from '../../hooks/usePocketbase';
import { Button, Table, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { JobContext } from '../../components/Context/JobContext';
import moment from 'moment';

import styles from './index.module.scss'

const Jobs = () => {
  const router = useRouter();
  const { jobs: jobList } = useContext(JobContext) as any;
  const { customers } = useContext(CustomerContext) as any;
  const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    setJobs(jobList);
  }, [jobList]);

  const createJob = () => {
    router.push('jobs/create');
  };

  console.log('jobs in clients page:', jobs);
  return (
      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
      <Title>Jobs table</Title>
      <Button onClick={createJob}>New Job</Button>
          
      </div>
      {jobs && (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Phone</th>
              <th>Appointment</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(jobs)?.map((job: any, idx: number) => (
              <tr key={`${job?.address}-${idx}`}>
                <td>{job.title}</td>
                <td>{job.address}</td>
                {/** @ts-ignore */}
                <td>{Object.values(customers).find((c:any)=>c.id === job.customerId)?.phone || ''}</td>
                <td>{`${job?.start ? moment(job.start).format('MM/DD/YYYY') : ''}`}</td>
                <td> {job.amountDue}</td>
                <td>
                  <Button onClick={() => router.push(`${router.asPath}/${job.id}`)}>
                    View
                  </Button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Jobs;
