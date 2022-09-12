import { IsNotEmpty, IsString } from 'class-validator'

export class ObtainTokenPairDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
