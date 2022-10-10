import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { CollectionType } from '../entities/collection.entity'

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  places: number[]

  @IsOptional()
  @IsEnum(CollectionType)
  type: CollectionType
}
