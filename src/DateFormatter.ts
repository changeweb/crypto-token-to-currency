export class DateFormatter {
  static getFormattedDate(date: string | number): string {
    const convertedToDate = new Date(date);
    const year = convertedToDate.getFullYear();
    const month = convertedToDate.getMonth() + 1;
    const day = convertedToDate.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    return formattedDate;
  }

  static dateMatched(date: string, timestamp: number): boolean {
    timestamp = Number(timestamp);
    const timestampDate: string = this.getFormattedDate(timestamp);
    const providedDate: string = this.getFormattedDate(date);
    return timestampDate === providedDate;
  }
}
