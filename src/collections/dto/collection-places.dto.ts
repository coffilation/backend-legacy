import { IsNotEmpty, IsNumber } from 'class-validator'

export class CollectionPlacesDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  placeIds: number[]
}
