import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../../components/Context/CustomerContext';
import usePocketbase from '../../hooks/usePocketbase';
import { Button, Table, Title } from '@mantine/core';
import { useRouter } from 'next/router';

const Clients = () => {
  const router = useRouter()
  const customers = useContext(CustomerContext);
  // const pb = usePocketbase();
  const [clients, setClients] = useState<any>([])

  useEffect(() => {
    
      setClients(customers);
  
  }, [customers]);
  
  console.log('customers in clients page:', clients);
  return (
    <div>
      <Title>Clients table</Title>
      {customers && (
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(clients)?.map((client: any, idx: number) => (
              <tr key={`${client?.address}-${idx}`}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.address}</td>
                <td>{client.phone}</td>
                <td>
                  <Button onClick={() => router.push(`${router.asPath}/${client.id}/edit`)}>
                    Update
                  </Button>
                  <Button>Delete</Button>
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
