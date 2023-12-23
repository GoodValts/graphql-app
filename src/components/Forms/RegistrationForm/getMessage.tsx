import { toast } from 'react-toastify';
import textObj from './langData';

export const getSuccessMessage = (lang: string): void => {
  toast.success(textObj[lang].successMessage);
};

export const getErrorMessage = (error: string, lang: string): void => {
  switch (error) {
    case 'auth/email-already-in-use':
      toast.error(textObj[lang].errorUserExist);
      break;
    case 'auth/operation-not-allowed':
      toast.error(textObj[lang].errorUnpossible);
      break;
    default:
      toast.error(textObj[lang].errorDefault);
  }
};
