import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { Collection } from 'collections/entities/collection.entity'
import { In, Not, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'
import { User } from 'users/entities/user.entity'
import { CollectionPointsDto } from 'collections/dto/collection-points.dto'
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
      relations: { points: true, author: true },
    })
  }

  findAll(authorId?: number) {
    if (authorId) {
      return this.collectionsRepository.find({
        relations: { points: true, author: true },
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

  async getCollection(collectionId: number) {
    const collection = await this.collectionsRepository.findOne({
      where: {
        id: collectionId,
      },
      relations: [`points`, `author`],
    })

    if (!collection) {
      throw new NotFoundException(
        `Collection with id ${collectionId} not found`,
      )
    }

    return collection
  }

  async addPoints(collectionId: number, { pointIds }: CollectionPointsDto) {
    const collection = await this.getCollection(collectionId)

    const points = await this.pointsRepository.findBy({ id: In(pointIds) })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...collection,
        points: [...collection.points, ...points],
      }),
      relations: [`points`, `author`],
    })
  }

  async removePoints(collectionId: number, { pointIds }: CollectionPointsDto) {
    const collection = await this.getCollection(collectionId)

    const points = await this.pointsRepository.findBy({ id: Not(In(pointIds)) })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...collection,
        points,
      }),
      relations: [`points`, `author`],
    })
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    await this.collectionsRepository.save({
      ...updateCollectionDto,
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
