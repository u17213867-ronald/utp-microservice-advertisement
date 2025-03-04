import { Injectable, NestInterceptor, CallHandler, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {

        if (data instanceof HttpException) {
          console.log(data)
          return {
            code: data.getStatus(),
            message: data.message,
            data: null,
          }
        }

        return {
          code: HttpStatus.OK,
          message: 'Successful request',
          data,
        }
      }),
    )
  }
}
