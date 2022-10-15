import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Post,
  Query,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { JwtUserId } from '../common/decorators/user.decorator'
import { CreateReviewDto } from './dto/create-review.dto'
import { ReviewsQueryDto } from './dto/reviews-query.dto'

@ApiTags(`reviews`)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @JwtUserId() jwtUserId: number,
    @Query() reviewsQueryDto: ReviewsQueryDto,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.createPlaceReview(
      jwtUserId,
      reviewsQueryDto,
      createReviewDto,
    )
  }

  @Get()
  findAll(@Query() reviewsQueryDto: ReviewsQueryDto) {
    return this.reviewsService.findAllPlaceReviews(reviewsQueryDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @JwtUserId() jwtUserId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(jwtUserId, id, updateReviewDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @JwtUserId() jwtUserId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reviewsService.remove(jwtUserId, id)
  }
}
