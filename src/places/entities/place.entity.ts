import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { PlaceCollection } from 'collections/entities/place-collection.entity'

export class Address {
  isolatedDwelling?: string
  cityBlock?: string
  houseNumber?: string
  houseName?: string
  manMade?: string
  mountainPass?: string
  stateDistrict?: string
  countryCode?: string
  cityDistrict?: string
  amenity?: string
  road?: string
  district?: string
  borough?: string
  suburb?: string
  subdivision?: string
  hamlet?: string
  croft?: string
  neighbourhood?: string
  allotments?: string
  quarter?: string
  residential?: string
  farm?: string
  farmyard?: string
  industrial?: string
  commercial?: string
  retail?: string
  emergency?: string
  historic?: string
  military?: string
  natural?: string
  landuse?: string
  place?: string
  railway?: string
  aerialway?: string
  boundary?: string
  aeroway?: string
  club?: string
  craft?: string
  leisure?: string
  office?: string
  shop?: string
  tourism?: string
  bridge?: string
  tunnel?: string
  waterway?: string
  city?: string
  town?: string
  state?: string
  village?: string
  region?: string
  postcode?: string
  country?: string
  municipality?: string
}

@Entity()
@Unique([`osmId`, `osmType`, `category`])
export class Place {
  @PrimaryGeneratedColumn()
  id: number

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

  @Column({
    type: `bigint`,
    transformer: { from: (value) => +value, to: (value) => value },
  })
  osmId: number

  @Column()
  osmType: string

  @Column()
  displayName: string

  @Column()
  category: string

  @Column()
  type: string

  @Column(`json`)
  address: Address
}
