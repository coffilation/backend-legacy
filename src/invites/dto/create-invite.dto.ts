import { UserRole } from 'collections/entities/user-collection.entity'
import { IsEnum } from 'class-validator'

export class CreateInviteDto {
  @IsEnum(UserRole)
  role: UserRole
}
