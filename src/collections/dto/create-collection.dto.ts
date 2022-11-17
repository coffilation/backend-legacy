import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import { CollectionType } from '../entities/collection.entity'
import { Type } from 'class-transformer'

class Color {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  red: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  green: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  blue: number
}

class CollectionGradient {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Color)
  startColor: Color

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Color)
  endColor: Color
}

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

  @IsOptional()
  @ValidateNested()
  @Type(() => CollectionGradient)
  gradient?: CollectionGradient
}
