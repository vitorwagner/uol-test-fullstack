import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import UserCard from '../components/UserCard';
import { Box, Typography } from '@mui/material';

type UserStatus = 'active' | 'deactivated' | 'inactive' | 'pending';

export interface User {
  id: number;
  name: string;
  email: string;
  CPF: string;
  phone: string;
  status: UserStatus;
}
const API_URL = import.meta.env.VITE_API_URL as string;

const Home = () => {
  const [users, setUsers] = useState([]);

  const FetchAPI = async () => {
    const response = await axios.get(API_URL);
    const data = await response.data;
    setUsers(data);
  };

  useEffect(() => {
    FetchAPI();
  }, []);

  return (
    <>
      <Header />

      <Typography variant="h4" component="div" align="center" margin="1rem">
        User Dashboard
      </Typography>
      <Typography variant="h6" component="div" align="center" margin="1rem">
        Registered users: {users.length}
      </Typography>
      {users.length === 0 && <p>Loading...</p>}
      {users.length > 0 && (
        <Box padding="1rem">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Box>
      )}
      
    </>
  );
};

export default Home;
