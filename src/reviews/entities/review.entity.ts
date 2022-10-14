import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Length, Max, Min } from 'class-validator'
import { Place } from '../../places/entities/place.entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { User } from '../../users/entities/user.entity'

@Entity()
@Unique([`authorId`, `placeOsmId`])
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @ApiHideProperty()
  @Exclude()
  @Column()
  authorId: number

  @ManyToOne(() => User, { onDelete: `CASCADE` })
  @JoinColumn()
  author: User

  @Min(1)
  @Max(5)
  @Column({ type: `real` })
  rating: number

  @Length(0, 1024)
  @Column({ length: 1024, nullable: true })
  description?: string

  @ApiHideProperty()
  @Exclude()
  @Column()
  placeOsmId: number

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Place)
  @JoinColumn()
  place: Place
}
