import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CollectionType } from '../entities/collection.entity'

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  places: number[]

  @IsNotEmpty()
  @IsEnum(CollectionType)
  type: CollectionType
}
