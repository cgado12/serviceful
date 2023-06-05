import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../../components/Context/CustomerContext';
import usePocketbase from '../../hooks/usePocketbase';
import { Button, Table, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import styles from './index.module.scss'

const Clients = () => {
  const router = useRouter()
  const { customers } = useContext(CustomerContext) as any;
  const [clients, setClients] = useState<any>([])

  useEffect(() => {
    
      setClients(customers);
  
  }, [customers]);

    const createClient = () => {
      router.push('clients/create');
    };
  
  console.log('customers in clients page:', clients);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <Title>Clients table</Title>
        <Button onClick={createClient}>New Client</Button>
      </div>
      {customers && (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(clients)?.map((client: any, idx: number) => (
              <tr key={`${client?.address}-${idx}`}>
                <td>{`${client.firstName} ${client.lastName}`}</td>

                <td>{client.address}</td>
                <td>{client.phone}</td>
                <td>
                  <Button onClick={() => router.push(`${router.asPath}/${client.id}`)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Clients;
