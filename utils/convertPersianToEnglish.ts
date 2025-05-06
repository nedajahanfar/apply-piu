export function convertPersianToEnglish(input: string): string {
  const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
  return input
    .split('')
    .map(char => {
      const index = persianNumbers.indexOf(char);
      return index > -1 ? index.toString() : char;
    })
    .join('')
    .replace(/,/g, ''); // remove commas
}
