export function formatDate(inputDate: string): string {
  if (inputDate.length === 8) {
    const month = inputDate.substring(0, 2);
    const day = inputDate.substring(2, 4);
    const year = inputDate.substring(4, 8);
    return `${month}.${day}.${year}`;
  } else {
    console.error("Invalid date format:", inputDate);
    return inputDate;
  }
}
