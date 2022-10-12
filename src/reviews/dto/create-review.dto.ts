import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator'

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number

  @IsString()
  @IsOptional()
  @Length(0, 1024)
  description?: string
}
