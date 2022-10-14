import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { PlaceCollection } from '../../collections/entities/place-collection.entity'

@Entity()
export class Place {
  @Column()
  name: string

  @ApiHideProperty()
  @Exclude()
  @OneToMany(
    () => PlaceCollection,
    (placeCollections) => placeCollections.place,
  )
  placeCollections: PlaceCollection[]

  @Column({ type: `float` })
  latitude: number

  @Column({ type: `float` })
  longitude: number

  @PrimaryColumn({
    type: `bigint`,
    transformer: { from: (value) => +value, to: (value) => value },
  })
  osmId: number
}
