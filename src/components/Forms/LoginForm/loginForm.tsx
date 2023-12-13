import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './loginForm.module.scss';
import loginSchema from './yup';
import Input from '../Input/input';
import { useAppSelector } from '../../../redux/hooks';
import { selectLanguage } from '../../../redux/store';

type LoginFormValues = {
  email: string;
  password: string;
};

const textObj: {
  [key: string]: {
    header: string;
    email: string;
    password: string;
    button: string;
  };
} = {
  en: {
    header: 'Log in your account',
    email: 'E-mail:',
    password: 'Password:',
    button: 'Submit',
  },
  ru: {
    header: 'Войдите в свой аккаунт',
    email: 'Электронная почта:',
    password: 'Пароль:',
    button: 'Войти',
  },
};

const LoginForm = (): JSX.Element => {
  const lang = useAppSelector(selectLanguage);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema(lang)),
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((d) => console.log('data=', d))}
    >
      <h2 className={styles.header}>{textObj[lang].header}</h2>
      <Input<LoginFormValues>
        styles={styles.input}
        label={textObj[lang].email}
        name="email"
        errors={errors.email}
        register={register}
        required
      />
      <Input<LoginFormValues>
        label={textObj[lang].password}
        name="password"
        errors={errors.password}
        register={register}
        required
      />
      <input
        className={`${styles.button} ${isValid ? '' : styles.buttonDisabled}`}
        type="submit"
        value={textObj[lang].button}
      />
    </form>
  );
};

export default LoginForm;
