import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from 'users/entities/user.entity'
import { UsersService } from 'users/users.service'

import { ObtainTokenPairDto } from 'auth/dto/obtain-token-pair.dto'
import { RefreshTokenPairDto } from 'auth/dto/refresh-token-pair.dto'
import { TokenPair } from 'auth/entities/token-pair.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private jwtAccessSecret = process.env.JWT_ACCESS_SECRET
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

  async validateLocal({ username, password }: ObtainTokenPairDto) {
    return this.serializeUserFields(
      await this.usersService.validateUser({ username, password }),
    )
  }

  async validateJWT({ id }: User) {
    return this.serializeUserFields(await this.usersService.findOne(id))
  }

  serializeUserFields(user: User) {
    return user ? { username: user.username, id: user.id } : undefined
  }

  obtainTokenPair(user: User): TokenPair {
    return {
      access: this.jwtService.sign(
        { ...user },
        {
          expiresIn: `1h`,
          secret: this.jwtAccessSecret,
        },
      ),
      refresh: this.jwtService.sign(
        { ...user },
        {
          expiresIn: `30d`,
          secret: this.jwtRefreshSecret,
        },
      ),
    }
  }

  refreshTokenPair({ refresh }: RefreshTokenPairDto): TokenPair {
    const user = this.jwtService.verify<User & { exp: number; iat: number }>(
      refresh,
      {
        secret: this.jwtRefreshSecret,
      },
    )
    delete user.exp
    delete user.iat

    return this.obtainTokenPair(user)
  }
}
