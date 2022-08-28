import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Place } from 'places/entities/place.entity'
import { User } from 'users/entities/user.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Place, (place) => place.collections, {
    onDelete: `CASCADE`,
  })
  @JoinTable()
  places: Place[]

  @ApiHideProperty()
  @Exclude()
  @Column()
  authorId: number

  @ManyToOne(() => User)
  @JoinColumn()
  author: User
}
