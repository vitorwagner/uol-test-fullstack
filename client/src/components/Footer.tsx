import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" padding="1rem" borderTop="1px solid #ddd">
      <Typography variant="body2" color="textSecondary">
        {new Date().getFullYear()} Developed by Vítor Magalhães Wagner
      </Typography>
    </Box>
  );
};

export default Footer;