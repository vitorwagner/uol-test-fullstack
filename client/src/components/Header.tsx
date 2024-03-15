import { Link } from 'react-router-dom';
import { ButtonGroup, Button, AppBar, Box, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Box display="flex" alignItems="center" justifyContent="space-between" margin="1rem">
        <Typography variant="h6" component="div">
          UOL Fullstack Test
        </Typography>
        <ButtonGroup>
          <Button variant="contained" component={Link} to="/">
            Home
          </Button>
          <Button variant="contained" component={Link} to="/create">
            Create
          </Button>
        </ButtonGroup>
      </Box>
    </AppBar>
  );
};

export default Header;
