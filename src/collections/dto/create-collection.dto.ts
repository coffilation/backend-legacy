import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CollectionType } from '../entities/collection.entity'

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsEnum(CollectionType)
  type: CollectionType
}
