import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { lastValueFrom } from 'rxjs'

import { User } from 'users/entities/user.entity'
import { UsersService } from 'users/users.service'

import { ObtainTokenPairDto } from 'auth/dto/obtain-token-pair.dto'
import { RefreshTokenPairDto } from 'auth/dto/refresh-token-pair.dto'
import { TriggerVerificationDto } from 'auth/dto/trigger-verification.dto'
import { TokenPair } from 'auth/entities/tokenPair.entity'

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private httpService: HttpService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private jwtAccessSecret = process.env.JWT_ACCESS_SECRET
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET
  private firebaseApiKey = process.env.FIREBASE_API_KEY

  async sendSMS(triggerVerificationDto: TriggerVerificationDto) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post<{ sessionInfo: string }>(
          process.env.FIREBASE_SEND_VERIFICATION_CODE_ENDPOINT,
          triggerVerificationDto,
          { params: { key: this.firebaseApiKey } },
        ),
      )

      await this.cacheManager.set(
        triggerVerificationDto.phoneNumber,
        data.sessionInfo,
      )
    } catch (error) {
      console.error(error, error.message, error.response.data)
    }
  }

  async validateLocal({ phoneNumber, code }: ObtainTokenPairDto) {
    const sessionInfo = await this.cacheManager.get(phoneNumber)

    try {
      await lastValueFrom(
        this.httpService.post<{ sessionInfo: string }>(
          process.env.FIREBASE_VERIFY_PHONE_NUMBER_ENDPOINT,
          { sessionInfo, code },
          { params: { key: this.firebaseApiKey } },
        ),
      )
    } catch (error) {
      console.error(error, error.message, error.response.data)
      return null
    }

    await this.cacheManager.del(phoneNumber)

    let user = await this.usersService.findOne(phoneNumber)
    if (!user) {
      user = await this.usersService.create({ phoneNumber })
    }

    return user
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

  validateJWT({ phoneNumber }: User) {
    return this.usersService.findOne(phoneNumber)
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
