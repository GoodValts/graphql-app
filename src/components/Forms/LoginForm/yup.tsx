import * as yup from 'yup';

const validationMessages: {
  [key: string]: {
    email: {
      required: string;
      invalidFormat: string;
    };
    password: {
      required: string;
      number: string;
      lowercaseLetter: string;
      uppercaseLetter: string;
      specialCharacter: string;
      length: string;
    };
  };
} = {
  en: {
    email: {
      required: 'Email is a required field',
      invalidFormat: 'Invalid e-mail format',
    },
    password: {
      required: 'Password is a required field',
      number: 'Password should contain at least 1 number',
      lowercaseLetter: 'Password should contain at least 1 lowercase letter',
      uppercaseLetter: 'Password should contain at least 1 uppercase letter',
      specialCharacter: 'Password should contain at least 1 special character',
      length: 'Password should be at least 8 characters long',
    },
  },
  ru: {
    email: {
      required: 'Укажите почту',
      invalidFormat: 'Неверный формат электронной почты',
    },
    password: {
      required: 'Задайте пароль',
      number: 'Пароль должен содержать хотя бы 1 цифру',
      lowercaseLetter: 'Пароль должен содержать хотя бы 1 строчную букву',
      uppercaseLetter: 'Пароль должен содержать хотя бы 1 заглавную букву',
      specialCharacter: 'Пароль должен содержать хотя бы 1 специальный символ',
      length: 'Пароль должен содержать минимум 8 символов',
    },
  },
};

const loginSchema = (
  lang: string
): yup.ObjectSchema<{
  email: string;
  password: string;
}> => {
  return yup.object().shape({
    email: yup
      .string()
      .required(validationMessages[lang].email.required)
      .email(validationMessages[lang].email.invalidFormat),

    password: yup
      .string()
      .required(validationMessages[lang].password.required)
      .matches(/^(?=.*\d)/, validationMessages[lang].password.number)
      .matches(
        /^(?=.*[a-z])/,
        validationMessages[lang].password.lowercaseLetter
      )
      .matches(
        /^(?=.*[A-Z])/,
        validationMessages[lang].password.uppercaseLetter
      )
      .matches(
        /^(?=.*[!@#$%^&*()])/,
        validationMessages[lang].password.specialCharacter
      )
      .min(8, validationMessages[lang].password.length),
  });
};

export default loginSchema;
