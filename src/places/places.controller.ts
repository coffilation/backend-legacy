import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common'
import { PlacesService } from './places.service'
import { CreatePlaceDto } from './dto/create-place.dto'
import { UpdatePlaceDto } from './dto/update-place.dto'
import { ApiTags } from '@nestjs/swagger'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'

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

  @Put(':osmId/collections')
  updatePlaceCollections(
    @Param('osmId') osmId: string,
    @Body() updatePlaceCollectionsDto: UpdatePlaceCollectionsDto,
  ) {
    return this.placesService.updatePlaceCollections(
      +osmId,
      updatePlaceCollectionsDto,
    )
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
