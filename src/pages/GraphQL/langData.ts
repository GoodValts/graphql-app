interface GraphQLLangObjType {
  prettify: string;
  urlPlaceholder: string;
  queryPlaceholder: string;
  variables: string;
  headers: string;
  errorMessage: string;
}

interface GraphQLTextObjType {
  [key: string]: GraphQLLangObjType;
}

const GraphQLtextObj: GraphQLTextObjType = {
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

export default GraphQLtextObj;
