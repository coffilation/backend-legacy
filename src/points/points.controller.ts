import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common'
import { PointsService } from './points.service'
import { CreatePointDto } from './dto/create-point.dto'
import { UpdatePointDto } from './dto/update-point.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags(`points`)
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointsService.create(createPointDto)
  }

  @Get()
  findAll() {
    return this.pointsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
    return this.pointsService.update(+id, updatePointDto)
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointsService.remove(+id)
  }
}
