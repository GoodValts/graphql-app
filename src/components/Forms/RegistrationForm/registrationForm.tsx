import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './registrationForm.module.scss';
import registrationSchema from './yup';
import Input from '../Input/input';
import { useAppSelector } from '../../../redux/hooks';
import { selectLanguage } from '../../../redux/store';

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
  };
} = {
  en: {
    header: 'Create account',
    name: 'Name:',
    email: 'E-mail:',
    password: 'Password:',
    confirmPassword: 'Confirm password',
    button: 'Submit',
  },
  ru: {
    header: 'Создайте аккаунт',
    name: 'Имя:',
    email: 'Электронная почта:',
    password: 'Пароль:',
    confirmPassword: 'Подтвердите пароль:',
    button: 'Создать',
  },
};

const RegistrationForm = (): JSX.Element => {
  const lang = useAppSelector(selectLanguage);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema(lang)),
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((d) => console.log('data=', d))}
    >
      <h2 className={styles.header}>{textObj[lang].header}</h2>
      <Input<RegistrationFormValues>
        label={textObj[lang].name}
        name="name"
        errors={errors.name}
        register={register}
        required
      />
      <Input<RegistrationFormValues>
        label={textObj[lang].email}
        name="email"
        errors={errors.email}
        register={register}
        required
      />
      <Input<RegistrationFormValues>
        label={textObj[lang].password}
        name="password"
        errors={errors.password}
        register={register}
        required
      />
      <Input<RegistrationFormValues>
        label={textObj[lang].confirmPassword}
        name="confirmPassword"
        errors={errors.confirmPassword}
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

export default RegistrationForm;
