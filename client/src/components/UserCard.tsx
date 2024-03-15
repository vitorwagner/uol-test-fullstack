import { Link } from 'react-router-dom';
import { User } from '../pages/Home';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface UserCardProps {
  user: User;
}

const statusColors = {
  active: 'green',
  deactivated: 'red',
  inactive: 'gray',
  pending: 'orange',
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Box padding="0.5rem">
      <Card>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width="40%">
              <Typography variant="h6" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" component="div">
                {user.email}
              </Typography>
            </Box>
            <Box width="20%">
              <Typography variant="body2" component="div">
                {user.phone}
              </Typography>
              <Typography variant="body2" component="div">
                {user.CPF}
              </Typography>
            </Box>
            <Box width="20%" display="flex" alignItems="center">
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: statusColors[user.status],
                }}
              />
              <Typography variant="body2" component="div">
                {user.status}
              </Typography>
            </Box>
            <Link to={`/update/${user.id}`}>
              <Button variant="contained">Editar</Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCard;
