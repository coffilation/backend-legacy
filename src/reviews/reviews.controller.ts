import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags(`reviews`)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateReviewDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.remove(+id)
  }
}
