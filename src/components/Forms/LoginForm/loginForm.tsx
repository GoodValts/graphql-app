import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import styles from './loginForm.module.scss';
import loginSchema from './yup';
import Input from '../Input/input';
import { useAppSelector } from '../../../redux/hooks';
import { selectLanguage } from '../../../redux/store';
import { auth, logInWithEmailAndPassword } from '../../../firebase/firebase';

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
    alert: string;
  };
} = {
  en: {
    header: 'Log in your account',
    email: 'E-mail:',
    password: 'Password:',
    button: 'Submit',
    alert: 'You are successfull login!',
  },
  ru: {
    header: 'Войдите в свой аккаунт',
    email: 'Электронная почта:',
    password: 'Пароль:',
    button: 'Войти',
    alert: 'Вы успешно авторизованы!',
  },
};

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const lang = useAppSelector(selectLanguage);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema(lang)),
  });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        navigate('/graphQL');
      }, 3000);
    }
  }, [user, loading]);

  return (
    <form
      className={show ? `${styles.form} ${styles.showAlert}` : styles.form}
      onSubmit={handleSubmit(() => logInWithEmailAndPassword(email, password))}
    >
      <h2 className={styles.header}>{textObj[lang].header}</h2>
      <Input<LoginFormValues>
        styles={styles.input}
        label={textObj[lang].email}
        name="email"
        errors={errors.email}
        register={register}
        setState={setEmail}
        required
      />
      <Input<LoginFormValues>
        label={textObj[lang].password}
        name="password"
        errors={errors.password}
        register={register}
        setState={setPassword}
        required
      />
      <input
        className={`${styles.button} ${isValid ? '' : styles.buttonDisabled}`}
        type="submit"
        value={textObj[lang].button}
      />
      {show && <Alert variant="success">{textObj[lang].alert}</Alert>}
    </form>
  );
};

export default LoginForm;
