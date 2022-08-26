import { Module } from '@nestjs/common'
import { PointsService } from './points.service'
import { PointsController } from './points.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Point } from 'points/entities/point.entity'
import { Collection } from 'collections/entities/collection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Point, Collection])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
