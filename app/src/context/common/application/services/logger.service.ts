import { type LoggerService } from '@nestjs/common'
import { ContextModel, DataModel, LogModel, Headers } from '../../domain/model/log.model'
import { CRITICAL, INFO, TYPE, WARNING } from '../../domain/enum/logger.enum'

export class Logger implements LoggerService {
  log(message: any, ...optionalParams: any[]): void {
    optionalParams.forEach((params: any) => {
      if (TYPE.find((element) => element === params.method)) {
        const logSchema = new LogModel()
        const dataSchema = new DataModel()
        const contextSchema = new ContextModel()
        const modelHeaders = new Headers()

        contextSchema.messageHTTP = params.parameterType
        contextSchema.url = decodeURIComponent(params.originalUrl.toString())
        contextSchema.method = params.method
        dataSchema.request = params.body

        modelHeaders['x-forwarded-for'] = params.headers['x-forwarded-for']
        modelHeaders['user-agent'] = params.headers['user-agent']
        modelHeaders.srv = params.headers.srv
        dataSchema.header = modelHeaders
        contextSchema.data = dataSchema
        logSchema.type = INFO
        logSchema.resultCode = 200
        logSchema.resultMessage = message
        logSchema.context = contextSchema
        logSchema.time = `${String(params.responseTime)} ms`
        console.log(JSON.stringify(logSchema))
      } else {
        console.log(JSON.stringify(message))
      }
    })
  }

  error(message: any, ...optionalParams: any[]): void {
    optionalParams.forEach((params) => {
      let type = CRITICAL
      if (params.code >= 400 && params.code < 500) {
        type = WARNING
      }
      const logSchema = new LogModel()
      const contextSchema = new ContextModel()
      const dataSchema = new DataModel()
      const modelHeaders = new Headers()

      contextSchema.messageHTTP = params.parameterType
      contextSchema.url = decodeURIComponent(params.originalUrl.toString())
      contextSchema.method = params.method
      dataSchema.response = params.dataResponse
      dataSchema.request = params.body

      modelHeaders['x-forwarded-for'] = params.headers['x-forwarded-for']
      modelHeaders['user-agent'] = params.headers['user-agent']
      modelHeaders.srv = params.headers.srv
      dataSchema.header = modelHeaders

      contextSchema.data = dataSchema
      logSchema.type = type
      logSchema.resultCode = params.code
      logSchema.resultMessage = params.message
      logSchema.context = contextSchema
      logSchema.trace = params.trace
      console.log(JSON.stringify(logSchema))
    })
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): void {
    console.log('-----------warn----------------')
    console.log(optionalParams)
    console.log('---------------------------')
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): void {
    console.log('----------debug-----------------')
    console.log(message)
    console.log(optionalParams)
    console.log('---------------------------')
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): void {
    console.log('----------verbose-----------------')
    console.log(message)
    console.log(optionalParams)
    console.log('---------------------------')
  }
}
