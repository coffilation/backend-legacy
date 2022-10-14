import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { User } from 'users/entities/user.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { PlaceCollection } from './place-collection.entity'
import { UserCollection } from './user-collection.entity'

export enum CollectionType {
  Public = `PUBLIC`,
  Private = `PRIVATE`,
}

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ApiHideProperty()
  @Exclude()
  @OneToMany(
    () => PlaceCollection,
    (placeCollection) => placeCollection.collection,
  )
  @JoinTable()
  placeCollections: PlaceCollection[]

  @ApiHideProperty()
  @Exclude()
  @OneToMany(
    () => UserCollection,
    (userCollection) => userCollection.collection,
  )
  userCollections: UserCollection[]

  @ApiHideProperty()
  @Exclude()
  @Column({ nullable: true })
  authorId?: number

  @ManyToOne(() => User, { onDelete: `SET NULL` })
  @JoinColumn()
  author?: User

  @Column({
    type: `enum`,
    enum: CollectionType,
    default: CollectionType.Private,
  })
  type: CollectionType
}
