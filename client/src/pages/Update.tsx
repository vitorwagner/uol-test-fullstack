import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import UserForm from '../components/UserForm';

const Update = () => {
  const params = useParams();

  return (
    <>
      <Header />
      <div>
        <h1>Update</h1>
        <p>Welcome to the update page</p>
      </div>
      <UserForm id={Number(params.id)} />
    </>
  );
};

export default Update;
