import { Module } from '@nestjs/common'
import { PlacesService } from './places.service'
import { PlacesController } from './places.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Place } from 'places/entities/place.entity'
import { Collection } from 'collections/entities/collection.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Place, Collection])],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
