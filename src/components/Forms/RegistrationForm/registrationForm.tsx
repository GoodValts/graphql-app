import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import styles from './registrationForm.module.scss';
import registrationSchema from './yup';
import Input from '../Input/input';
import { auth, db } from '../../../firebase/firebase';
import { AuthContext } from '../../../controllers/appControllers';
import textObj from './langData';
import { getErrorMessage, getSuccessMessage } from './getMessage';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationForm = (): JSX.Element => {
  const { lang } = useContext(AuthContext);
  const [user] = useAuthState(auth);

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
    if (user) {
      setTimeout(() => {
        navigate('/graphQL');
      }, 3000);
    }
  }, [user]);

  const submitForm = (d: RegistrationFormValues): void => {
    const { name, email, password } = d;
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        addDoc(collection(db, 'users'), {
          uid: res.user.uid,
          name,
          authProvider: 'local',
          email,
        }).then(() => getSuccessMessage(lang));
      })
      .catch((err) => {
        getErrorMessage(err.code, lang);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit((d) => submitForm(d))}>
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
      <ToastContainer
        position="bottom-center"
        theme="colored"
        closeOnClick
        autoClose={false}
      />
    </form>
  );
};

export default RegistrationForm;
