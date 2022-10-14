import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateCollectionPlacesDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  placeOsmIds: number[]
}
