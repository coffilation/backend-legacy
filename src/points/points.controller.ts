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

  @Get(':osmId')
  findOne(@Param('osmId') osmId: string) {
    return this.pointsService.findOne(+osmId)
  }

  @Get(':osmId/collections')
  findPointCollections(@Param('osmId') osmId: string) {
    return this.pointsService.findPointCollections(+osmId)
  }

  @Patch(':osmId')
  update(@Param('osmId') osmId: string, @Body() updatePointDto: UpdatePointDto) {
    return this.pointsService.update(+osmId, updatePointDto)
  }

  @HttpCode(204)
  @Delete(':osmId')
  remove(@Param('osmId') osmId: string) {
    return this.pointsService.remove(+osmId)
  }
}
