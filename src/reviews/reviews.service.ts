import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createPlaceReview(
    placeOsmId: number,
    userId: number,
    createReviewDto: CreateReviewDto,
  ) {
    const review = await this.reviewRepository.save({
      authorId: userId,
      placeId: placeOsmId,
      ...createReviewDto,
    })

    return this.findOne(review.id)
  }

  findAllPlaceReviews(placeOsmId: number) {
    return this.reviewRepository.find({
      where: { place: { osmId: placeOsmId } },
      relations: { place: true },
    })
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { author: true },
    })

    if (!review) {
      throw new NotFoundException()
    }

    return review
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = this.findOne(id)

    return this.reviewRepository.save({ ...review, ...updateReviewDto })
  }

  async remove(id: number) {
    await this.reviewRepository.delete({ id })
  }
}
