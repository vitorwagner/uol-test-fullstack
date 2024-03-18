import { Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserForm from '../components/UserForm';

const Create = () => {
  return (
    <>
      <Header />
      <Typography variant="h4" component="div" align="center" margin="1rem">
        User Dashboard
      </Typography>
      <Typography variant="h6" component="div" align="center" margin="1rem">
        Create user
      </Typography>
      <UserForm />
      <br />
      <Footer />
    </>
  );
};

export default Create;
