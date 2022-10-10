import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { User } from 'users/entities/user.entity'
import { Collection } from './collection.entity'

export enum UserRole {
  Owner = `OWNER`,
  Admin = `ADMIN`,
  Editor = `EDITOR`,
  Member = `MEMBER`,
}

@Entity()
export class UserCollection {
  @PrimaryColumn()
  userId: number

  @PrimaryColumn()
  collectionId: number

  @ManyToOne(() => User, { onDelete: `CASCADE` })
  @JoinColumn()
  user: User

  @ManyToOne(() => Collection, { onDelete: `CASCADE` })
  @JoinTable()
  collection: Collection

  @Column({
    type: `enum`,
    enum: UserRole,
    default: UserRole.Member,
  })
  role: UserRole
}
