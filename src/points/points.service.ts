import { Injectable } from '@nestjs/common'
import { CreatePointDto } from './dto/create-point.dto'
import { UpdatePointDto } from './dto/update-point.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Point } from 'points/entities/point.entity'

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
  ) {}

  async create(createPointDto: CreatePointDto) {
    return this.pointsRepository.findOneBy(
      await this.pointsRepository.save({
        ...createPointDto,
      }),
    )
  }

  findAll() {
    return this.pointsRepository.find()
  }

  findOne(id: number) {
    return this.pointsRepository.findOneBy({ id })
  }

  async update(id: number, updatePointDto: UpdatePointDto) {
    return this.pointsRepository.findOneBy(
      await this.pointsRepository.save({ ...updatePointDto, id }),
    )
  }

  async remove(id: number) {
    await this.pointsRepository.delete(id)
  }
}
