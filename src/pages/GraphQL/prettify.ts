const prettify = (code: string): string => {
  let level = 0;
  let result = '';
  const str = code
    .replace(/\s*([{}])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '{') {
      level += 2;
      result += ` ${str[i]}\n${' '.repeat(level)}`;
    } else if (str[i] === '}') {
      level -= 2;
      result += `\n${' '.repeat(level)}${str[i]}`;
    } else if (str[i] === ' ') {
      result += `\n${' '.repeat(level)}`;
    } else {
      result += str[i];
    }
  }
  // console.log(str);
  // console.log(result);
  return result;
};

export default prettify;
