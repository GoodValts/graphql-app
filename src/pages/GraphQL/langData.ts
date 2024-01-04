interface GrapgQLLangObjType {
  prettify: string;
  urlPlaceholder: string;
  queryPlaceholder: string;
  variables: string;
  headers: string;
  errorMessage: string;
}

interface GrapgQLTextObjType {
  [key: string]: GrapgQLLangObjType;
}

const GrapgQLtextObj: GrapgQLTextObjType = {
  en: {
    prettify: 'Prettify',
    urlPlaceholder: 'Enter URL',
    queryPlaceholder: 'Enter query',
    variables: 'Variables',
    headers: 'Headers',
    errorMessage: 'Server cannot be reached',
  },
  ru: {
    prettify: 'Форматировать',
    urlPlaceholder: 'Введите URL',
    queryPlaceholder: 'Введите запрос',
    variables: 'Переменные',
    headers: 'Заголовки',
    errorMessage: 'Сервер недоступен',
  },
};

export default GrapgQLtextObj;
