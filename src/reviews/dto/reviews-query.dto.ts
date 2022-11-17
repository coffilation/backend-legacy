import { IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

export class ReviewsQueryDto {
  @Type(() => Number)
  @IsPositive()
  placeId: number
}
