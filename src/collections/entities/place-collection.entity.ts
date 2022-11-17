import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Collection } from './collection.entity'
import { Place } from '../../places/entities/place.entity'

@Entity()
export class PlaceCollection {
  @PrimaryColumn()
  placeId: number

  @ManyToOne(() => Place, (place) => place.placeCollections, {
    onDelete: `CASCADE`,
  })
  @JoinColumn()
  place: Place

  @PrimaryColumn()
  collectionId: number

  @ManyToOne(() => Collection, (collection) => collection.placeCollections, {
    onDelete: `CASCADE`,
  })
  collection: Collection
}
