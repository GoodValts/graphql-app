import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useAppSelector } from '../../../redux/hooks';
import { selectLanguage } from '../../../redux/store';

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
  },
};

const loginSchema = (
  lang: string
): yup.ObjectSchema<{ name: string; email: string }> => {
  return yup.object().shape({
    name: yup
      .string()
      .required(validationMessages[lang].name.required)
      .matches(/^[A-Za-z]+$/, validationMessages[lang].name.required)
      .matches(/^[A-Z]/, 'First letter should be uppercase'),

    email: yup
      .string()
      .required('Email is a required field')
      .email('Invalid e-mail format'),
  });
};

export default loginSchema;
