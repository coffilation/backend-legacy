import { Module } from '@nestjs/common'
import { PointsService } from './points.service'
import { PointsController } from './points.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Point } from 'points/entities/point.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
