import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
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

  @ManyToOne(() => Collection, (collection) => collection.userCollections, {
    onDelete: `CASCADE`,
  })
  @JoinColumn()
  collection: Collection

  @Column({
    type: `enum`,
    enum: UserRole,
    default: UserRole.Member,
  })
  role: UserRole
}
