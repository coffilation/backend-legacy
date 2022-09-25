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

  async findOne(username: User[`username`]) {
    return this.usersRepository.findOneBy({ username })
  }

  async findOneById(id: User[`id`]) {
    return this.usersRepository.findOneBy({ id })
  }

  async findMe(user: User) {
    return this.usersRepository.findOneBy(user)
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ username })

    if (!user) {
      throw new NotFoundException()
    }

    return this.usersRepository.findOneBy(
      await this.usersRepository.save({ id: user.id, ...updateUserDto }),
    )
  }

  async remove(username: string, jwtUser: User) {
    const user = await this.usersRepository.findOneBy({ username })

    if (!user) {
      throw new NotFoundException()
    }

    if (jwtUser.id !== user.id) {
      throw new ForbiddenException()
    }
    await this.usersRepository.delete({ username })
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
