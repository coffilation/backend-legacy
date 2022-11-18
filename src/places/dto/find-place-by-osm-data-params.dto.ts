import { IsPositive, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class FindPlaceByOsmDataParamsDto {
  @Type(() => Number)
  @IsPositive()
  osmId: number

  @IsString()
  osmType: string

  @IsString()
  category: string
}
