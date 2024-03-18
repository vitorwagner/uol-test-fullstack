import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import Footer from '../components/Footer';
import { Typography } from '@mui/material';

const Update = () => {
  const params = useParams();

  return (
    <>
      <Header />
      <Typography variant="h4" component="div" align="center" margin="1rem">
        User Dashboard
      </Typography>
      <Typography variant="h6" component="div" align="center" margin="1rem">
        Update user
      </Typography>
      <UserForm id={Number(params.id)} />
      <br />
      <Footer />
    </>
  );
};

export default Update;
