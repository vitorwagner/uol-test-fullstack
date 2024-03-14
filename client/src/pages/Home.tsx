import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import UserCard from '../components/UserCard';

export interface User {
  id: number;
  name: string;
  CPF: string;
  phone: string;
  status: string;
}
const API_URL = import.meta.env.VITE_API_URL as string;

const Home = () => {
  const [users, setUsers] = useState([]);

  const FetchAPI = async () => {
    const response = await axios.get(API_URL);
    const data = await response.data;
    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    FetchAPI();
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page</p>
      </div>
      <h2>Users</h2>
      <div>
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default Home;
