interface GraphQLLangObjType {
  prettify: string;
  documentation: string;
  reset: string;
  urlPlaceholder: string;
  queryPlaceholder: string;
}

interface GraphQLTextObjType {
  [key: string]: GraphQLLangObjType;
}

const GraphQLtextObj: GraphQLTextObjType = {
  en: {
    prettify: 'Prettify',
    reset: 'Reset',
    documentation: 'Documentation',
    urlPlaceholder: 'Enter URL',
    queryPlaceholder: 'Enter query',
  },
  ru: {
    prettify: 'Форматировать',
    reset: 'Сбросить',
    documentation: 'Документация',
    urlPlaceholder: 'Введите URL',
    queryPlaceholder: 'Введите запрос',
  },
};

export default GraphQLtextObj;
