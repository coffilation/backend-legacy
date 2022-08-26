import { IsNotEmpty, IsNumber } from 'class-validator'

export class CollectionPointsDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  pointIds: number[]
}
