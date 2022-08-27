import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  places: number[]
}
