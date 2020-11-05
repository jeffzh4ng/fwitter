import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RestAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    if (!request.session) return false
    return true
  }
}

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    if (!req.session.userId) return false

    return true
  }
}
