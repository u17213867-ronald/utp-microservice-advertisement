import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

export class ConfigService {
  private readonly envConfig

  constructor() {
    this.envConfig = dotenvExpand.expand(dotenv.config({ path: '.env' }))
  }

  get(key: string): string {
    const env = this.envConfig.parsed
    return env === undefined ? '' : env[key]
  }

  getFilter(keys: string[]): any {
    return Object.fromEntries(Object.entries(this.envConfig.parsed).filter(([key]) => keys.includes(key)))
  }

  getDebug(key: string): any {
    const keyError = `${key}_DB_ERROR`
    const keyQuery = `${key}_DB_QUERY`
    return [this.envConfig[keyError], this.envConfig[keyQuery]]
  }
}
