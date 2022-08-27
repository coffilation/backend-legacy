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
  NotFoundException,
} from '@nestjs/common'
import { PlacesService } from './places.service'
import { CreatePlaceDto } from './dto/create-place.dto'
import { UpdatePlaceDto } from './dto/update-place.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags(`places`)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto)
  }

  @Get()
  findAll() {
    return this.placesService.findAll()
  }

  @Get(':osmId')
  async findOne(@Param('osmId') osmId: string) {
    const place = await this.placesService.findOne(+osmId)

    if (!place) {
      throw new NotFoundException()
    }

    return place
  }

  @Get(':osmId/collections')
  findPlaceCollections(@Param('osmId') osmId: string) {
    return this.placesService.findPlaceCollections(+osmId)
  }

  @Patch(':osmId')
  update(
    @Param('osmId') osmId: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.update(+osmId, updatePlaceDto)
  }

  @HttpCode(204)
  @Delete(':osmId')
  remove(@Param('osmId') osmId: string) {
    return this.placesService.remove(+osmId)
  }
}
