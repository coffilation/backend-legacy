import { IsOptional, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

export class GetCollectionsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  placeId?: number

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  userId?: number
}
