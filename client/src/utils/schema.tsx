import Joi from 'joi';

export const schema = Joi.object({
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
  phone: Joi.string()
    .pattern(new RegExp('^\\([1-9]{2}\\) (?:[2-8]|9[0-9])[0-9]{3}\\-[0-9]{4}$'))
    .required()
    .messages({
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
