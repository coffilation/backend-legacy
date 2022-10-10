import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^0-9]\w+$/)
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  rePassword: string
}
