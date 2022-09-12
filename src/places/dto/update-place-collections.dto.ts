import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdatePlaceCollectionsDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  collectionIds: number[]
}
