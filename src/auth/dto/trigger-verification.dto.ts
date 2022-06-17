import { IsPhoneNumber, IsString } from 'class-validator'

export class TriggerVerificationDto {
  @IsPhoneNumber()
  phoneNumber: string

  @IsString()
  recaptchaToken: string
}
