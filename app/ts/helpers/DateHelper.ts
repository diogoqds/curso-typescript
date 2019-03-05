export class DateHelper {

  static dataToString(data: Date): string {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  static stringToData(data: string): Date {
    return new Date(data);
  }
}