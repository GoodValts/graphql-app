import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Alert } from 'react-bootstrap';
import styles from './registrationForm.module.scss';
import registrationSchema from './yup';
import Input from '../Input/input';
import { registerWithEmailAndPassword, auth } from '../../../firebase/firebase';
import { AuthContext } from '../../../controllers/appControllers';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const textObj: {
  [key: string]: {
    header: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    button: string;
    alert: string;
  };
} = {
  en: {
    header: 'Create account',
    name: 'Name:',
    email: 'E-mail:',
    password: 'Password:',
    confirmPassword: 'Confirm password',
    button: 'Submit',
    alert: 'You are successfull register!',
  },
  ru: {
    header: 'Создайте аккаунт',
    name: 'Имя:',
    email: 'Электронная почта:',
    password: 'Пароль:',
    confirmPassword: 'Подтвердите пароль:',
    button: 'Создать',
    alert: 'Вы успешно зарегистрировались!',
  },
};

const RegistrationForm = (): JSX.Element => {
  const { lang } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema(lang)),
  });

  useEffect(() => {
    if (loading) return;
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
      onSubmit={handleSubmit(() =>
        registerWithEmailAndPassword(name, email, password)
      )}
    >
      <h2 className={styles.header}>{textObj[lang].header}</h2>
      <Input<RegistrationFormValues>
        label={textObj[lang].name}
        name="name"
        errors={errors.name}
        register={register}
        setState={setName}
        required
      />
      <Input<RegistrationFormValues>
        label={textObj[lang].email}
        name="email"
        errors={errors.email}
        register={register}
        setState={setEmail}
        required
      />
      <Input<RegistrationFormValues>
        label={textObj[lang].password}
        name="password"
        setState={setPassword}
        errors={errors.password}
        register={register}
        type="password"
        required
      />
      <Input<RegistrationFormValues>
        label={textObj[lang].confirmPassword}
        name="confirmPassword"
        errors={errors.confirmPassword}
        register={register}
        type="password"
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

export default RegistrationForm;
