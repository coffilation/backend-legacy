import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { PlacesService } from './places.service'
import { CreatePlaceDto } from './dto/create-place.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'
import { JwtUserId } from 'common/decorators/user.decorator'
import { GetPlacesQueryDto } from './dto/get-places-query.dto'
import { UnsafeExtractUserJwtAuthGuard } from 'auth/guards/unsafe-extract-user-jwt-auth.guard'

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags(`places`)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(UnsafeExtractUserJwtAuthGuard)
  findAll(@JwtUserId() jwtUserId: number, @Query() query: GetPlacesQueryDto) {
    return this.placesService.findAll(jwtUserId, query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) placeId: number) {
    return await this.placesService.findOne(placeId)
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
