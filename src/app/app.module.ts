import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'users/users.module'
import { PointsModule } from 'points/points.module'
import { CollectionsModule } from 'collections/collections.module'
import { ReviewsModule } from 'reviews/reviews.module'
import { AuthModule } from 'auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    TypeOrmModule.forRoot({
      type: `postgres`,
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CollectionsModule,
    PointsModule,
    ReviewsModule,
    UsersModule,
  ],
})
export class AppModule {}
