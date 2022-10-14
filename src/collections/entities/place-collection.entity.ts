import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Collection } from './collection.entity'
import { Place } from '../../places/entities/place.entity'

@Entity()
export class PlaceCollection {
  @PrimaryColumn({
    type: `bigint`,
    transformer: { from: (value) => +value, to: (value) => value },
  })
  placeOsmId: number

  @ManyToOne(() => Place, (place) => place.placeCollections)
  place: Place

  @PrimaryColumn()
  collectionId: number

  @ManyToOne(() => Collection, (collection) => collection.placeCollections)
  collection: Collection
}
