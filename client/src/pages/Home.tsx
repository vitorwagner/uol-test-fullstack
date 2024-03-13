import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

interface User {
  id: number;
  name: string;
  CPF: string;
  status: string;
}

const Home = () => {
  const API_URL = "http://localhost:8080/api/users";
  const [users, setUsers] = useState([]);

  const FetchAPI = async () => {
    const response = await axios.get(API_URL);
    const data = await response.data;
    setUsers(data);
    console.log(data);
  }

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
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name} - {user.CPF} - {user.status}</li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Home;
