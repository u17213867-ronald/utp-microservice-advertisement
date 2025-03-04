import { type ExceptionFilter, Catch, type ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { type BaseInputException } from '@common/application/exceptions/base-input.exception'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger()
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const baseInputException = exception.response as BaseInputException
    const message = baseInputException === undefined ? exception.message : baseInputException.error
    const data = (baseInputException === undefined ? exception.data : baseInputException.message) ?? []
    const code =
      (baseInputException === undefined ? exception.status : baseInputException.statusCode) ??
      HttpStatus.INTERNAL_SERVER_ERROR
    const exceptionResponse = {
      code,
      message,
      data,
    }
    const { originalUrl, method, headers, ip, body } = ctx.getRequest()
    const ips = headers['x-forwarded-for'] || ip
    const clientIp = ips.includes(',') ? ips.split(',', 1)[0] : ips
    const dataResponse = exceptionResponse
    const responseData = {
      originalUrl,
      method,
      headers,
      clientIp,
      body,
      dataResponse,
      code,
    }
    this.logger.error(exceptionResponse.message, responseData)
    response.status(code).json(exceptionResponse)
  }
}
