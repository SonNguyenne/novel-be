import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Request } from 'express'

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this._extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}

export function Authorization() {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth())
}
