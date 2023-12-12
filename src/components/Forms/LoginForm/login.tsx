import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './login.module.scss';
import loginSchema from './yup';
import Input from '../Input/input';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = (): JSX.Element => {
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
        <h2 className={styles.header}>Log in your account</h2>
        <Input<LoginFormValues>
          styles={styles.input}
          label="E-mail:"
          name="email"
          errors={errors.email}
          register={register}
          required
        />
        <Input<LoginFormValues>
          label="Password:"
          name="password"
          errors={errors.password}
          register={register}
          required
        />
        <input
          className={`${styles.button} ${isValid ? '' : styles.buttonDisabled}`}
          type="submit"
          placeholder="Submit"
        />
      </form>
      <p className={styles.paragraph}>
        Don&apos;t have an account?{' '}
        <a className={styles.link} href="/registration">
          Sign up
        </a>{' '}
        now!
      </p>
    </>
  );
};

export default LoginForm;
