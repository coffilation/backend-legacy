import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude, Transform } from 'class-transformer'

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number

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
  @Column({ unique: true, type: `bigint` })
  osmId: number
}
