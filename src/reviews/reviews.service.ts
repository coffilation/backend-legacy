import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './entities/review.entity'
import { ReviewsQueryDto } from './dto/reviews-query.dto'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createPlaceReview(
    userId: number,
    { placeOsmId }: ReviewsQueryDto,
    createReviewDto: CreateReviewDto,
  ) {
    const review = await this.reviewRepository.save({
      authorId: userId,
      placeOsmId,
      ...createReviewDto,
    })

    return this.findOne(review.id)
  }

  findAllPlaceReviews({ placeOsmId }: ReviewsQueryDto) {
    return this.reviewRepository.find({
      where: { placeOsmId },
      relations: { author: true },
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

  async update(
    jwtUserId: number,
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.checkEditAccessAndFind(jwtUserId, id)

    return this.reviewRepository.save({ ...review, ...updateReviewDto })
  }

  async remove(jwtUserId: number, id: number) {
    await this.checkEditAccessAndFind(jwtUserId, id)

    await this.reviewRepository.delete({ id })
  }

  async checkEditAccessAndFind(jwtUserId: number, reviewId: number) {
    const review = await this.findOne(reviewId)

    if (review.id !== jwtUserId) {
      throw new ForbiddenException()
    }

    return review
  }
}
