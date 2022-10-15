import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsLatitude()
  @Type(() => Number)
  latitude: number

  @IsNotEmpty()
  @IsLongitude()
  @Type(() => Number)
  longitude: number

  @IsNotEmpty()
  @IsPositive()
  osmId: number
}
