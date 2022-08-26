import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePointDto } from './dto/create-point.dto'
import { UpdatePointDto } from './dto/update-point.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ArrayContainedBy, ArrayContains, In, Repository } from 'typeorm'
import { Point } from 'points/entities/point.entity'
import { Collection } from 'collections/entities/collection.entity'

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,

    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
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

  findOne(osmId: number) {
    return this.pointsRepository.findOneBy({ osmId })
  }

  async findPointCollections(osmId: number) {
    const point = await this.pointsRepository.findOne({
      where: { osmId },
      relations: { collections: true },
    })

    if (!point) {
      throw new NotFoundException()
    }

    return point.collections
  }

  async update(osmId: number, updatePointDto: UpdatePointDto) {
    return this.pointsRepository.findOneBy(
      await this.pointsRepository.save({ ...updatePointDto, osmId }),
    )
  }

  async remove(id: number) {
    await this.pointsRepository.delete(id)
  }
}
