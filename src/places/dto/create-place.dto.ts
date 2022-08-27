import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  latitude: number

  @IsNotEmpty()
  @IsNumber()
  longitude: number

  @IsNotEmpty()
  @IsNumber()
  osmId: number
}