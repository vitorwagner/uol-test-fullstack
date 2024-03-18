import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { CPFPatternCustom, PhonePatternCustom } from '../utils/customPatterns';
import { Box, TextField, Select, MenuItem, Button } from '@mui/material';

interface UserFormProps {
  id?: number;
}

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of 3',
    'string.max': 'Name should have a maximum length of 30',
    'any.required': 'Name is a required field',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is a required field',
  }),
  phone: Joi.string().pattern(new RegExp('^([1-9]{2}) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$')).required().messages({
    'string.empty': 'Phone cannot be empty',
    'string.pattern.base': 'Phone number is not valid',
    'any.required': 'Phone is a required field',
  }),
  CPF: Joi.string().length(14).required().messages({
    'string.empty': 'CPF cannot be empty',
    'string.length': 'CPF must be 14 characters long',
    'any.required': 'CPF is a required field',
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status cannot be empty',
    'any.required': 'Status is a required field',
  }),
});

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'deactivated', label: 'Deactivated' },
];

const UserForm: React.FC<UserFormProps> = ({ id }) => {
  const API_URL = import.meta.env.VITE_API_URL as string;

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const { error } = schema.validate(payload);
    if (error) {
      alert(error.message);
    } else {
      console.log(payload);
      if (id === undefined) {
        axios.post(`${API_URL}`, payload);
      } else axios.put(`${API_URL}/update/${id}`, payload);
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
      </Box>
    </Box>
  );
};

export default UserForm;
