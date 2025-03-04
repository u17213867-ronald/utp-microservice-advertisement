import { Injectable } from '@nestjs/common'
import { DotenvExpandOutput } from 'dotenv-expand';
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
@Injectable()
export class ConfigService {
  private readonly envConfig: DotenvExpandOutput

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
