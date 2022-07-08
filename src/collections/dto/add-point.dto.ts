import { IsNotEmpty, IsNumber } from 'class-validator'

export class AddPointDto {
  @IsNotEmpty()
  @IsNumber()
  pointId: number
}
