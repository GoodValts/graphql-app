interface TextObjType {
  [key: string]: {
    header: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    button: string;
    successMessage: string;
    errorUserExist: string;
    errorImpossible: string;
    errorDefault: string;
  };
}

const textObj: TextObjType = {
  en: {
    header: 'Create account',
    name: 'Name:',
    email: 'E-mail:',
    password: 'Password:',
    confirmPassword: 'Confirm password',
    button: 'Submit',
    successMessage: 'You are successful registered!',
    errorUserExist: 'User with such email already exist!',
    errorImpossible: 'Registration in the application is not possible.',
    errorDefault: 'Attention! We got an error!',
  },
  ru: {
    header: 'Создайте аккаунт',
    name: 'Имя:',
    email: 'Электронная почта:',
    password: 'Пароль:',
    confirmPassword: 'Подтвердите пароль:',
    button: 'Создать',
    successMessage: 'Вы успешно зарегистрировались!',
    errorUserExist: 'Пользователь с таким email уже существует!',
    errorImpossible: 'Регистрация в приложении не возможна.',
    errorDefault: 'Внимание! Произошла ошибка!',
  },
};

export default textObj;
