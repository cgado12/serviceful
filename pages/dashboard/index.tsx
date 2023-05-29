import { Title, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../components/Context/UserContext";


const Dashboard = () => {
  const router = useRouter()
  const user = useContext(UserContext)
  console.log(user)

  const createClient = () => {
   router.push('clients/create')
  }
  const createJob = () => {
    router.push('jobs/create');
  }
  const createPayment = () => {
    router.push('payments/create');
  }


return(
  <div>
    <Title>Dashboard</Title>
    <div>
      
      <Button onClick={createClient}>New Client</Button>
      <Button onClick={createJob}>New Job</Button>
      <Button onClick={createPayment}>Take Payment</Button>
    </div>
  </div>
)};

export default Dashboard;