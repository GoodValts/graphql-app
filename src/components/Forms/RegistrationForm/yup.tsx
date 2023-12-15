import * as yup from 'yup';

const validationMessages: {
  [key: string]: {
    name: {
      required: string;
      englishLetters: string;
      uppercaseFirstLetter: string;
    };
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
    confirmPassword: {
      required: string;
      mismatch: string;
    };
  };
} = {
  en: {
    name: {
      required: 'Name is a required field',
      englishLetters: 'Name should contain only English letters',
      uppercaseFirstLetter: 'First letter should be uppercase',
    },
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
    confirmPassword: {
      required: 'Confirm Password is a required field',
      mismatch: 'Passwords do not match',
    },
  },
  ru: {
    name: {
      required: 'Укажите имя',
      englishLetters: 'Имя должно содержать только русские буквы',
      uppercaseFirstLetter: 'Первая буква должна быть заглавной',
    },
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
    confirmPassword: {
      required: 'Подтверите пароль',
      mismatch: 'Пароли не совпадают',
    },
  },
};

const registrationSchema = (
  lang: string
): yup.ObjectSchema<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}> => {
  return yup.object().shape({
    name: yup
      .string()
      .required(validationMessages[lang].name.required)
      .test(
        'letters',
        validationMessages[lang].name.englishLetters,
        (value) => {
          switch (lang) {
            case 'ru':
              return /^[А-Яа-я]+$/.test(value);
            default:
              return /^[A-Za-z]+$/.test(value);
          }
        }
      )
      .test(
        'First letter',
        validationMessages[lang].name.uppercaseFirstLetter,
        (value) => {
          switch (lang) {
            case 'ru':
              return /^[A-Z]/.test(value);
            default:
              return /^[A-Z]/.test(value);
          }
        }
      ),

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

    confirmPassword: yup
      .string()
      .required(validationMessages[lang].confirmPassword.required)
      .oneOf(
        [yup.ref('password')],
        validationMessages[lang].confirmPassword.mismatch
      ),
  });
};

export default registrationSchema;
