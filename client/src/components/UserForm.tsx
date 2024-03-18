import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CPFPatternCustom, PhonePatternCustom } from '../utils/customPatterns';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import { schema } from '../utils/schema';

interface UserFormProps {
  id?: number;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'deactivated', label: 'Deactivated' },
];

const UserForm: React.FC<UserFormProps> = ({ id }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL as string;

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    CPF: '',
    status: 'active',
  });
  useEffect(() => {
    if (id !== undefined) {
      axios.get(`${API_URL}/${id}`).then((response) => {
        const data = response.data;

        setFormValues({
          name: data.name,
          email: data.email,
          phone: data.phone,
          CPF: data.CPF,
          status: data.status,
        });
      });
    }
  }, [id, API_URL]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const { error } = schema.validate(payload);
    if (error) {
      alert(error.message);
    } else {
      try {
        if (id === undefined) {
          await axios.post(`${API_URL}`, payload);
        } else await axios.put(`${API_URL}/update/${id}`, payload);
        navigate('/');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setIsError(true);
          setMessage(error.response?.data || 'An error occurred');
        }
      }
    }
  };

  return (
    <Box display="flex">
      <Box
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <form onSubmit={onSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            height="400px"
          >
            <div>
              <TextField
                type="text"
                label="name"
                name="name"
                id="name"
                placeholder="Name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                type="text"
                label="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                name="phone"
                id="phone"
                label="Phone"
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues({ ...formValues, phone: e.target.value })
                }
                InputProps={{
                  // https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  inputComponent: PhonePatternCustom as any,
                }}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                name="CPF"
                id="CPF"
                label="CPF"
                value={formValues.CPF}
                onChange={(e) =>
                  setFormValues({ ...formValues, CPF: e.target.value })
                }
                InputProps={{
                  // https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  inputComponent: CPFPatternCustom as any,
                }}
                variant="standard"
              />
            </div>
            <div>
              <Select
                name="status"
                label="status"
                id="status"
                value={formValues.status}
                onChange={(e) =>
                  setFormValues({ ...formValues, status: e.target.value })
                }
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <Button type="submit" variant="contained">
                <span>{id ? 'Update' : 'Create'}</span>
              </Button>
            </div>
          </Box>
        </form>
        {message && (
          <Typography
            className={isError ? 'error-message' : 'success-message'}
            margin="3rem"
            variant="h5"
            color="red"
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
