import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm'
import { Point } from 'points/entities/point.entity'

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Point)
  @JoinTable()
  points: Point[]
}
