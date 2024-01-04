interface EndpointLangObjType {
  urlPlaceholder: string;
  errorMessage: string;
}

interface EndpointTextObjType {
  [key: string]: EndpointLangObjType;
}

const EndpointTextObj: EndpointTextObjType = {
  en: {
    urlPlaceholder: 'Enter URL',
    errorMessage: 'Server cannot be reached',
  },
  ru: {
    urlPlaceholder: 'Введите URL',
    errorMessage: 'Сервер недоступен',
  },
};

export default EndpointTextObj;
