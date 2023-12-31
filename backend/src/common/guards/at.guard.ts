import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ACCESS_TOKEN } from '../constants/guard'

@Injectable()
export class AtGuard extends AuthGuard(ACCESS_TOKEN) {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const result =  super.canActivate(context)
        if (!result){
          throw new UnauthorizedException('Invalid or expired token');
        }
        return result;
  }
}
