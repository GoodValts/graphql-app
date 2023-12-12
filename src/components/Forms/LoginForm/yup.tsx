import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Invalid e-mail format'),

  password: yup
    .string()
    .required('Password is a required field')
    .matches(/^(?=.*\d)/, 'Password should contain at least 1 number')
    .matches(
      /^(?=.*[a-z])/,
      'Password should contain at least 1 lowercase letter'
    )
    .matches(
      /^(?=.*[A-Z])/,
      'Password should contain at least 1 uppercase letter'
    )
    .matches(
      /^(?=.*[!@#$%^&*()])/,
      'Password should contain at least 1 special character'
    )
    .min(8, 'Password should be at least 8 characters long'),
});

export default loginSchema;
