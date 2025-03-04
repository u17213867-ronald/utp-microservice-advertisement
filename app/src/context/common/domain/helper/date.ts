import { format } from 'date-fns'

export class DateTime {
  public static convertToUTC(dateString: string): Date {
    const date = new Date(dateString)
    date.setTime(date.getTime() + 5 * 3600000)
    return date
  }

  public static convertToZone(dateString: string): string {
    const date = new Date(dateString)
    date.setTime(date.getTime() + -5 * 3600000)
    return format(date, 'yyyy-MM-dd HH:mm:ss')
  }

  public static convertToDate(dateString: string): string {
    const date = new Date(dateString)
    return format(date, 'yyyy-MM-dd 00:00:00')
  }

  public static transformOnlyDates(key: string, value?: unknown | string): string {
    if (['publicationAt', 'publicationEndAt'].includes(key)) {
      return format(DateTime.convertToUTC(String(value)), "yyyy-MM-dd'T'HH:mm:ss'Z'")
    }
    return String(value)
  }

  public static version(): number {
    return new Date().getTime()
  }
}
