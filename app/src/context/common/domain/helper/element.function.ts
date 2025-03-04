export class ElementFunction {
  public static logo(host: string, name: string, id: number, type: string): string {
    const baseURL = host.replace('%s', String(id))
    const isCatalogType = type === 'catalogo-0km'
    let logoStore = name !== '' ? baseURL.replace('%s', name) : ''
    if (isCatalogType && name !== '') {
      logoStore = (host.replace('/content/resellers/%s/store/160x120/%s', '') + name).replace('origin', '160x120')
    }
    return logoStore
  }
}
