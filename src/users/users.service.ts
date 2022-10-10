import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from 'users/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { compareSync, hash } from 'bcrypt'
import { GetUserIdDto } from './dto/get-user-id.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ password, rePassword, ...createUserDto }: CreateUserDto) {
    if (password !== rePassword) {
      throw new BadRequestException(`Passwords doesn't match`)
    }

    return this.usersRepository.findOneBy(
      await this.usersRepository.save({
        ...createUserDto,
        password: await this.hashPassword(password),
      }),
    )
  }

  findAll() {
    return this.usersRepository.find()
  }

  async findOne(id: User[`id`]) {
    const user = await this.usersRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async findOneByUsername(username: User[`username`]) {
    const user = await this.usersRepository.findOneBy({ username })

    if (!user) {
      throw new NotFoundException()
    }

    return { id: user.id } as GetUserIdDto
  }

  async update(id: User[`id`], updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)

    return this.usersRepository.save({
      ...user,
      ...updateUserDto,
    })
  }

  async remove(id: User[`id`], jwtUserId: number) {
    const user = await this.findOne(id)

    if (jwtUserId !== user.id) {
      throw new ForbiddenException()
    }

    await this.usersRepository.delete({ id })
  }

  hashPassword(password: string) {
    return hash(password, 10)
  }

  async validateUser({
    username,
    password,
  }: Pick<User, `username` | `password`>) {
    const user = await this.usersRepository.findOneBy({ username })

    if (user?.password && compareSync(password, user.password)) {
      return user
    }
  }
}
