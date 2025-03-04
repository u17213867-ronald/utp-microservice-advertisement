import { BadRequestInfrastructureException } from '@common/infrastructure/exceptions/bad-request-infrastructure.exception'

export class BaseInputException {
  statusCode: number
  message: string | string[]
  error: string
}
export class BabRequestException<T> extends BadRequestInfrastructureException<T> {}
