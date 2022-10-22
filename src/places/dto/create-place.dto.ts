import {
  IsDefined,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Address } from 'places/entities/place.entity'

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

  @IsNotEmpty()
  @IsString()
  osmType: string

  @IsNotEmpty()
  @IsString()
  displayName: string

  @IsNotEmpty()
  @IsString()
  category: string

  @IsNotEmpty()
  @IsString()
  type: string

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  address: Address
}
