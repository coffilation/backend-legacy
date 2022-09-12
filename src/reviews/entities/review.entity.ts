import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Review {
  @PrimaryColumn()
  id: number
}
