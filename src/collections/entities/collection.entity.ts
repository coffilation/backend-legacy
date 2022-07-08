import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Point } from 'points/entities/point.entity'
import { User } from 'users/entities/user.entity'
import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Point)
  @JoinTable()
  points: Point[]

  @ApiHideProperty()
  @Exclude()
  @Column()
  authorId: number

  @ManyToOne(() => User)
  @JoinColumn()
  author: User
}
