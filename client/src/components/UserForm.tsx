import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import InputMask from 'react-input-mask';

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
    status: '',
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
    <>
      <div>
        <h1>UserForm for User {id}</h1>
        <p>Welcome to the user form page</p>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
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
          <input
            type="text"
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
          <InputMask
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            mask="(99) 99999-9999"
            maskChar={null}
            value={formValues.phone}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
          />
        </div>
        <div>
          <InputMask
            type="text"
            name="CPF"
            id="CPF"
            placeholder="CPF"
            mask="999.999.999-99"
            maskChar={null}
            value={formValues.CPF}
            onChange={(e) =>
              setFormValues({ ...formValues, CPF: e.target.value })
            }
          />
        </div>
        <div>
          <select
            name="status"
            id="status"
            value={formValues.status}
            onChange={(e) =>
              setFormValues({ ...formValues, status: e.target.value })
            }
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
