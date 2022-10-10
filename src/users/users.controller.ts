import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'
import { JwtUserId } from 'common/decorators/user.decorator'

@ApiTags(`users`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll() {
  //   return this.usersService.findAll()
  // }

  @ApiOperation({ summary: `Получить id пользователя по username'у` })
  @Get(':username/id')
  getId(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@JwtUserId() userId: number) {
    return this.usersService.findOne(userId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('application/x-www-form-urlencoded')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @JwtUserId() userId: number,
  ) {
    await this.usersService.remove(id, userId)
  }
}
