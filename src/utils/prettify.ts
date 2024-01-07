const getQueryName = (code: string): string => {
  let queryEnd = 0;
  for (let i = 0; i <= code.length; i += 1) {
    if (code[i] === '{') {
      queryEnd = i;
      break;
    }
  }
  return code.slice(0, queryEnd).replace(/\s+/g, ' ').trim();
};

const prettify = (code: string): string => {
  const queryName = getQueryName(code);

  let ident = 0;
  let result = '';

  const str = code
    .replace(/\s*([{}])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(queryName, '');

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '{') {
      ident += 2;
      result += ` ${str[i]}\n${' '.repeat(ident)}`;
    } else if (str[i] === '}') {
      ident -= 2;
      result += `\n${' '.repeat(ident)}${str[i]}`;
    } else if (str[i] === ' ' && str[i - 1] !== ',' && str[i - 1] !== ':') {
      result += `\n${' '.repeat(ident)}`;
    } else if (str[i - 1] === '}') {
      result += `\n${' '.repeat(ident)}${str[i]}`;
    } else {
      result += str[i];
    }
  }

  return `${queryName}${result}`;
};

export default prettify;
