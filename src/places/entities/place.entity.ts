import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude, Transform } from 'class-transformer'

@Entity()
export class Place {
  @Column()
  name: string

  @ApiHideProperty()
  @Exclude()
  @ManyToMany(() => Collection, (collection) => collection.places, {
    onDelete: `CASCADE`,
  })
  collections: Collection[]

  @Column({ type: `float` })
  latitude: number

  @Column({ type: `float` })
  longitude: number

  @Transform(({ value }) => +value)
  @PrimaryColumn({ type: `bigint` })
  osmId: number
}
