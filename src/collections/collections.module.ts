import { Module } from '@nestjs/common'
import { CollectionsService } from './collections.service'
import { CollectionsController } from './collections.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { Place } from 'places/entities/place.entity'
import { UserCollection } from './entities/user-collection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Place, Collection, UserCollection])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
