import { IsPositive, ValidateIf } from 'class-validator'
import { Type } from 'class-transformer'

export class GetPlacesQueryDto {
  @ValidateIf(({ collectionId, userId }) => !userId || collectionId)
  @Type(() => Number)
  @IsPositive()
  collectionId?: number

  @ValidateIf(({ collectionId, userId }) => !collectionId || userId)
  @Type(() => Number)
  @IsPositive()
  userId?: number
}
