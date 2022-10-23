import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Collection } from 'collections/entities/collection.entity'
import { UserRole } from 'collections/entities/user-collection.entity'

@Entity()
export class Invite {
  @PrimaryGeneratedColumn(`uuid`)
  uuid: string

  @Column()
  collectionId: number

  @Column({
    type: `enum`,
    enum: UserRole,
  })
  role: UserRole

  @ManyToOne(() => Collection)
  @JoinColumn({ name: `collectionId` })
  collection: Collection
}
