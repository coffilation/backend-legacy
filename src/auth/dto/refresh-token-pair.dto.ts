import { IsJWT, IsNotEmpty } from 'class-validator'

export class RefreshTokenPairDto {
  @IsNotEmpty()
  @IsJWT()
  refresh: string
}
