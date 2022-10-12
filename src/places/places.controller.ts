import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { PlacesService } from './places.service'
import { CreatePlaceDto } from './dto/create-place.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { JwtUserId } from '../common/decorators/user.decorator'
import { ReviewsService } from '../reviews/reviews.service'
import { CreateReviewDto } from '../reviews/dto/create-review.dto'

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

  @ApiOperation({ summary: `Список всех точек в своих коллекциях` })
  @Get(`/my`)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@JwtUserId() userId: number) {
    return this.placesService.findAll(userId)
  }

  @Get(':osmId')
  async findOne(@Param('osmId', ParseIntPipe) osmId: number) {
    return await this.placesService.findOne(osmId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':osmId/collections')
  findPlaceCollections(@Param('osmId', ParseIntPipe) osmId: number) {
    return this.placesService.findPlaceCollections(osmId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post(':osmId/set-collections')
  updatePlaceCollections(
    @Param('osmId', ParseIntPipe) osmId: number,
    @Body() updatePlaceCollectionsDto: UpdatePlaceCollectionsDto,
  ) {
    return this.placesService.updatePlaceCollections(
      osmId,
      updatePlaceCollectionsDto,
    )
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Patch(':osmId')
  // update(
  //   @Param('osmId', ParseIntPipe) osmId: number,
  //   @Body() updatePlaceDto: UpdatePlaceDto,
  // ) {
  //   return this.placesService.update(osmId, updatePlaceDto)
  // }

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
