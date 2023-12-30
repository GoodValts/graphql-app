interface GraphQLLangObjType {
  prettify: string;
  submit: string;
  urlPlaceholder: string;
  queryPlaceholder: string;
}

interface GraphQLTextObjType {
  [key: string]: GraphQLLangObjType;
}

const GraphQLtextObj: GraphQLTextObjType = {
  en: {
    prettify: 'Prettify',
    submit: 'Submit',
    urlPlaceholder: 'Enter URL',
    queryPlaceholder: 'Enter query',
  },
  ru: {
    prettify: 'Форматировать',
    submit: 'Подтвердить',
    urlPlaceholder: 'Введите URL',
    queryPlaceholder: 'Введите запрос',
  },
};

export default GraphQLtextObj;
