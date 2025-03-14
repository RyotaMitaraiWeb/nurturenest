export function isMoreThanDaysAfter(date1: Date, date2: Date, days: number): boolean {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  return differenceInMilliseconds > days * millisecondsInADay;
}