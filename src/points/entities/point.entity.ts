import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Collection } from 'collections/entities/collection.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ApiHideProperty()
  @Exclude()
  @ManyToMany(() => Collection, (collection) => collection.points)
  collections: Collection[]

  @Column({ type: `float` })
  latitude: number

  @Column({ type: `float` })
  longitude: number

  @Column({ unique: true })
  osmId: number
}
