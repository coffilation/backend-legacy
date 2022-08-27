import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateCollectionDto } from './create-collection.dto'

export class UpdateCollectionDto extends OmitType(
  PartialType(CreateCollectionDto),
  [`places`],
) {}
