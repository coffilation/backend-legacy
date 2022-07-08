import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { Collection } from 'collections/entities/collection.entity'
import { In, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'
import { User } from 'users/entities/user.entity'
import { AddPointDto } from 'collections/dto/add-point.dto'
import { Point } from 'points/entities/point.entity'

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,

    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
  ) {}

  async create(
    { points, ...createCollectionDto }: CreateCollectionDto,
    author: User,
  ) {
    const pointEntities = await this.pointsRepository.findBy({
      id: In(points),
    })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...createCollectionDto,
        points: pointEntities,
        authorId: author.id,
      }),
      relations: [`points`, `author`],
    })
  }

  findAll(authorId?: number) {
    if (authorId) {
      return this.collectionsRepository.find({
        relations: [`points`, `author`],
        where: { authorId: authorId },
      })
    }

    return this.collectionsRepository.find({ relations: [`points`, `author`] })
  }

  findOne(id: number) {
    return this.collectionsRepository.findOne({
      where: { id },
      relations: [`points`],
    })
  }

  async addPoint(collectionId: number, { pointId }: AddPointDto) {
    const point = await this.pointsRepository.findOneBy({ id: pointId })

    if (!point) {
      return new NotFoundException(`Point with id ${pointId} not found`)
    }

    const collection = await this.collectionsRepository.findOne({
      where: {
        id: collectionId,
      },
      relations: [`points`, `author`],
    })

    if (!collection) {
      return new NotFoundException(
        `Collection with id ${collectionId} not found`,
      )
    }

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...collection,
        points: [...collection.points, point],
      }),
      relations: [`points`, `author`],
    })
  }

  async update(
    id: number,
    { points, ...updateCollectionDto }: UpdateCollectionDto,
  ) {
    const pointEntities = await this.collectionsRepository.findBy({
      id: In(points),
    })

    await this.collectionsRepository.save({
      ...updateCollectionDto,
      points: pointEntities,
      id,
    })

    return this.collectionsRepository.findOne({
      where: { id },
      relations: [`points`],
    })
  }

  async remove(id: number) {
    await this.collectionsRepository.delete(id)
  }
}
