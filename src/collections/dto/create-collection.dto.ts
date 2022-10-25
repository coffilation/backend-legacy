import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { CollectionType } from '../entities/collection.entity'

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsEnum(CollectionType)
  type: CollectionType

  @IsOptional()
  @IsString()
  @Length(0, 1024)
  description?: string
}
