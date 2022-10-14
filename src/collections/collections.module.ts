import { forwardRef, Module } from '@nestjs/common'
import { CollectionsService } from './collections.service'
import { CollectionsController } from './collections.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { UserCollection } from './entities/user-collection.entity'
import { PlacesModule } from '../places/places.module'
import { PlaceCollection } from './entities/place-collection.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, UserCollection, PlaceCollection]),
    forwardRef(() => PlacesModule),
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
