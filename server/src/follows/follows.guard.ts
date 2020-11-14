import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class FollowsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const gqlCtx = GqlExecutionContext.create(context)
    const args: { targetId: string } = gqlCtx.getArgs()

    const userId = gqlCtx.getContext().req.session.userId

    console.log(userId, args.targetId)

    return userId === args.targetId ? false : true
  }
}
