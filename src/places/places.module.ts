import { forwardRef, Module } from '@nestjs/common'
import { PlacesService } from './places.service'
import { PlacesController } from './places.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Place } from 'places/entities/place.entity'
import { Collection } from 'collections/entities/collection.entity'
import { CollectionsModule } from '../collections/collections.module'
import { PlaceCollection } from '../collections/entities/place-collection.entity'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, Collection, PlaceCollection]),
    HttpModule,
    forwardRef(() => CollectionsModule),
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
