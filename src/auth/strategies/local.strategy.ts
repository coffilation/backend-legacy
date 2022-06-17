import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { AuthService } from 'auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: `phoneNumber`,
      passwordField: `code`,
    })
  }

  async validate(phoneNumber: string, code: string) {
    const user = await this.authService.validateLocal({ phoneNumber, code })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
