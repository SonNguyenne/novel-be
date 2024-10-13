import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HttpRequest')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()
    const now = Date.now()

    const logParts = [
      `[${req.method}] - ${req.url}`,
      req.query && Object.keys(req.query).length ? `QUERY - ${JSON.stringify(req.query)}` : '',
      req.params && Object.keys(req.params).length ? `PARAMS - ${JSON.stringify(req.params)}` : '',
      req.body && Object.keys(req.body).length ? `BODY - ${JSON.stringify(req.body)}` : '',
      `\x1b[36m${req.ip}\x1b[36m`,
      `${this._color(res.statusCode)} \x1b[33m+${Date.now() - now} ms\x1b[33m`,
    ]

    const logMessage = logParts.filter(part => part).join(' | ')

    return next.handle().pipe(
      tap(() => req.url && this.logger.log(logMessage)),
      catchError(error => {
        req.url && this.logger.error(logMessage)
        throw error
      }),
    )
  }

  private _color(statusCode: number): string {
    const green = '\x1b[32m'
    const yellow = '\x1b[33m'
    const red = '\x1b[31m'
    const reset = '\x1b[0m'

    if (statusCode >= 200 && statusCode < 300) {
      return `${green}${statusCode}${reset}`
    } else if (statusCode >= 400 && statusCode < 500) {
      return `${yellow}${statusCode}${reset}`
    } else if (statusCode >= 500) {
      return `${red}${statusCode}${reset}`
    }

    return `${statusCode}`
  }
}
