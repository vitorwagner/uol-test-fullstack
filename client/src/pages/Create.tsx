import { Typography } from '@mui/material';
import Header from '../components/Header';
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
    </>
  );
};

export default Create;
