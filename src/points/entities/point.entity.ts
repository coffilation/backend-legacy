import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: `float` })
  latitude: number

  @Column({ type: `float` })
  longitude: number

  @Column({ unique: true })
  osmId: number
}
