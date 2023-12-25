interface GrapgQLLangObjType {
  prettify: string;
  submit: string;
  urlPlaceholder: string;
  queryPlaceholder: string;
}

interface GrapgQLTextObjType {
  [key: string]: GrapgQLLangObjType;
}

const GrapgQLtextObj: GrapgQLTextObjType = {
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

export default GrapgQLtextObj;
