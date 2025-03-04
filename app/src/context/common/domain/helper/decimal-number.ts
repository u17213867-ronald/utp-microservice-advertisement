export class DecimalNumber {
  static format(number: number, decimals = 0, decimalSeparator = '.', thousandsSeparator = ','): string {
    let num = number.toFixed(decimals).toString()
    const regex = /(\d)(?=(\d{3})+(?!\d))/g
    num = num.replace(regex, `$1${thousandsSeparator}`)
    return num.replace('.', decimalSeparator)
  }
}
