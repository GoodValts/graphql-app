interface LangObjType {
  header: string;
  email: string;
  password: string;
  button: string;
  successLogin: string;
  errorManyRequests: string;
  errorEmailAndPassword: string;
  errorDefault: string;
}

interface TextObjType {
  [key: string]: LangObjType;
}

const textObj: TextObjType = {
  en: {
    header: 'Log in your account',
    email: 'E-mail:',
    password: 'Password:',
    button: 'Submit',
    successLogin: 'You are successful login!',
    errorManyRequests:
      'Too many unsuccessful login attempts, account is temporarily locked',
    errorEmailAndPassword: 'Incorrect email or password!',
    errorDefault: 'Attention! We got an error!',
  },
  ru: {
    header: 'Войдите в свой аккаунт',
    email: 'Электронная почта:',
    password: 'Пароль:',
    button: 'Войти',
    successLogin: 'Вы успешно авторизованы!',
    errorManyRequests:
      'Cлишком много неудачных попыток входа, аккаунт временно заблокирован',
    errorEmailAndPassword: 'Некорректный email или пароль!',
    errorDefault: 'Внимание! Произошла ошибка!',
  },
};

export default textObj;
