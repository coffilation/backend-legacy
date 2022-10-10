import { Module } from '@nestjs/common'
import { CollectionsService } from './collections.service'
import { CollectionsController } from './collections.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { UserCollection } from './entities/user-collection.entity'
import { PlacesModule } from '../places/places.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, UserCollection]),
    PlacesModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
