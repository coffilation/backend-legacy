import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from 'users/users.module'

import { AuthController } from 'auth/auth.controller'
import { AuthService } from 'auth/auth.service'
import { JwtStrategy } from 'auth/strategies/jwt.strategy'
import { LocalStrategy } from 'auth/strategies/local.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_ACCESS_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
