import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PointsModule } from './points/points.module';
import { CollectionsModule } from './collections/collections.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    PointsModule,
    CollectionsModule,
    ReviewsModule,
    AuthModule,
  ],
})
export class AppModule {}
