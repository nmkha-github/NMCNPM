/*
Lexorank
The idea of Atlassian JIRA
*/

const mid = (prev: number, next: number) => Math.floor((prev + next) / 2);

const getChar = (str: string, i: number, defaultChar: number) =>
  i >= str.length ? defaultChar : byte(str.charAt(i));

const byte = (char: string) => char.charCodeAt(0);

const string = (byte: number) => String.fromCharCode(byte);

const getOrderString = (prev: string, next: string) => {
  const MIN_CHAR = byte("!");
  const MAX_CHAR = byte("~");

  if (prev === "" || !prev) {
    prev = string(MIN_CHAR);
  }
  if (next === "" || !next) {
    next = string(MAX_CHAR);
  }

  let rank = "";
  let i = 0;

  while (true) {
    let prevChar = getChar(prev, i, MIN_CHAR);
    let nextChar = getChar(next, i, MAX_CHAR);

    if (prevChar === nextChar) {
      rank += string(prevChar);
      i++;
      continue;
    }

    let midChar = mid(prevChar, nextChar);
    if (midChar === prevChar || midChar === nextChar) {
      rank += string(prevChar);
      i++;
      continue;
    }

    rank += string(midChar);
    break;
  }

  return rank;
};

export default getOrderString;
