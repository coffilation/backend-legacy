import { IsPhoneNumber, IsString } from 'class-validator'

export class ObtainTokenPairDto {
  @IsPhoneNumber()
  phoneNumber: string

  @IsString()
  code: string
}
