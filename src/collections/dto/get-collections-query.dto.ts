import { IsPositive, ValidateIf } from 'class-validator'
import { Type } from 'class-transformer'

export class GetCollectionsQueryDto {
  @ValidateIf(({ placeOsmId, userId }) => !userId || placeOsmId)
  @Type(() => Number)
  @IsPositive()
  placeOsmId?: number

  @ValidateIf(({ placeOsmId, userId }) => !placeOsmId || userId)
  @Type(() => Number)
  @IsPositive()
  userId?: number
}
