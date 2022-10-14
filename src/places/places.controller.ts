import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { JwtUserId } from '../common/decorators/user.decorator'
import { ReviewsService } from '../reviews/reviews.service'
import { CreateReviewDto } from '../reviews/dto/create-review.dto'
import { GetPlacesQueryDto } from './dto/get-places-query.dto'
import { UnsafeExtractUserJwtAuthGuard } from '../auth/guards/unsafe-extract-user-jwt-auth.guard'

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@ApiTags(`places`)
@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService,
    private readonly reviewsService: ReviewsService,
  ) {}

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

  @Get(':osmId')
  async findOne(@Param('osmId', ParseIntPipe) osmId: number) {
    return await this.placesService.findOne(osmId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':osmId/collections')
  updatePlaceCollections(
    @Param('osmId', ParseIntPipe) osmId: number,
    @JwtUserId() jwtUserId,
    @Body() updatePlaceCollectionsDto: UpdatePlaceCollectionsDto,
  ) {
    return this.placesService.updatePlaceCollections(
      jwtUserId,
      osmId,
      updatePlaceCollectionsDto,
    )
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':osmId')
  remove(@Param('osmId', ParseIntPipe) osmId: number) {
    return this.placesService.remove(osmId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':osmId/reviews')
  createPlaceReview(
    @Param('osmId', ParseIntPipe) osmId: number,
    @JwtUserId() userId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.createPlaceReview(osmId, userId, createReviewDto)
  }

  @Get(':osmId/reviews')
  findAllPlaceReview(@Param('osmId', ParseIntPipe) osmId: number) {
    return this.reviewsService.findAllPlaceReviews(osmId)
  }
}
