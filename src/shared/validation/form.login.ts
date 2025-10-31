import type { RegisterOptions } from 'react-hook-form';

/**
 * Login Form Validation Rules
 * Used with React Hook Form
 */
export const loginValidation = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  } satisfies RegisterOptions,
  
  password: {
    required: 'Password is required',
    minLength: { value: 1, message: 'Password is required' },
  } satisfies RegisterOptions,
};

