import { ExecutionContext, Injectable } from '@nestjs/common'
import { JwtAuthGuard } from './jwt-auth.guard'

@Injectable()
export class UnsafeExtractUserJwtAuthGuard extends JwtAuthGuard {
  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context)
    } catch (error) {
      if (error.status !== 401) {
        throw error
      }
    }
    return true
  }
}
