import { Module } from '@nestjs/common'
import { CollectionsService } from './collections.service'
import { CollectionsController } from './collections.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { Point } from 'points/entities/point.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Point, Collection])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
