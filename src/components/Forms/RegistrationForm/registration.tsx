import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './registration.module.scss';
import loginSchema from './yup';
import Input from '../Input/input';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit((d) => console.log('data=', d))}
      >
        <h2 className={styles.header}>Create your account</h2>
        <Input<RegistrationFormValues>
          label="Name:"
          name="name"
          errors={errors.name}
          register={register}
          required
        />
        <Input<RegistrationFormValues>
          label="E-mail:"
          name="email"
          errors={errors.email}
          register={register}
          required
        />
        <Input<RegistrationFormValues>
          label="Password:"
          name="password"
          errors={errors.password}
          register={register}
          required
        />
        <Input<RegistrationFormValues>
          label="Confirm password:"
          name="confirmPassword"
          errors={errors.confirmPassword}
          register={register}
          required
        />
        <input
          className={`${styles.button} ${isValid ? '' : styles.buttonDisabled}`}
          type="submit"
        />
      </form>
      <p className={styles.paragraph}>
        Already have an account?{' '}
        <a className={styles.link} href="/login">
          Log in
        </a>{' '}
        now!
      </p>
    </>
  );
};

export default RegistrationForm;
