import { toast } from 'react-toastify';
import textObj from './langData';

export const getSuccessMessage = (lang: string): void => {
  toast.success(textObj[lang].successLogin);
};

export const getErrorMessage = (error: string, lang: string): void => {
  switch (error) {
    case 'auth/too-many-requests':
      toast.error(textObj[lang].errorManyRequests);
      break;
    case 'auth/invalid-credential':
      toast.error(textObj[lang].errorEmailAndPassword);
      break;
    default:
      toast.error(textObj[lang].errorDefault);
      break;
  }
};
