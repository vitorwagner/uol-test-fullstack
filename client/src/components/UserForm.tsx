import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { PatternFormat } from 'react-number-format';
import { Box, TextField, Select, MenuItem, Button } from '@mui/material';

interface UserFormProps {
  id?: number;
}

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string().length(15).required(),
  CPF: Joi.string().length(14).required(),
  status: Joi.string().required(),
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
              <label htmlFor="">Phone: </label>
              <PatternFormat
                name="phone"
                id="phone"
                placeholder="Phone"
                value={formValues.phone}
                onValueChange={({ value }) =>
                  setFormValues({ ...formValues, phone: value })
                }
                format="(##) #####-####"
                mask=""
              />
            </div>
            <div>
              <label>CPF: </label>
              <PatternFormat
                name="CPF"
                id="CPF"
                placeholder="CPF"
                format="###.###.###-##"
                mask=""
                value={formValues.CPF}
                onChange={(e) =>
                  setFormValues({ ...formValues, CPF: e.target.value })
                }
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
