import { OmitType, PartialType } from '@nestjs/swagger'
import { CreatePlaceDto } from './create-place.dto'

export class UpdatePlaceDto extends PartialType(
  OmitType(CreatePlaceDto, [`osmId`]),
) {}
