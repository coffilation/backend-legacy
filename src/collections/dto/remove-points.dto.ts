import { IsNotEmpty, IsNumber } from 'class-validator'

export class RemovePointsDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  pointIds: number[]
}
