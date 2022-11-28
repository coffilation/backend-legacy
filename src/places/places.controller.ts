import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { PlacesService } from './places.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'
import { JwtUserId } from 'common/decorators/user.decorator'
import { GetPlacesQueryDto } from './dto/get-places-query.dto'
import { FindPlaceByOsmDataParamsDto } from './dto/find-place-by-osm-data-params.dto'
import { FastifyRequest } from 'fastify'

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags(`places`)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Body() createPlaceDto: CreatePlaceDto) {
  //   return this.placesService.create(createPlaceDto)
  // }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@JwtUserId() jwtUserId: number, @Query() query: GetPlacesQueryDto) {
    return this.placesService.findAll(jwtUserId, query)
  }

  @ApiOperation({ summary: `Получить точку по id на бэкенде` })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) placeId: number) {
    return await this.placesService.findOne(placeId)
  }

  @ApiOperation({ summary: `Получить точку по данным из nominatim` })
  @Get(':osmId/:osmType/:category')
  async findOneByOsmData(
    @Param() params: FindPlaceByOsmDataParamsDto,
    @Req() request: FastifyRequest,
  ) {
    return await this.placesService.findOneByOsmData(params, request)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id/collections')
  updatePlaceCollections(
    @Param('id', ParseIntPipe) placeId: number,
    @JwtUserId() jwtUserId,
    @Body() updatePlaceCollectionsDto: UpdatePlaceCollectionsDto,
  ) {
    return this.placesService.updatePlaceCollections(
      jwtUserId,
      placeId,
      updatePlaceCollectionsDto,
    )
  }
}
