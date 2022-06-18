import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { Collection } from 'collections/entities/collection.entity'
import { In, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
  ) {}

  async create({ points, ...createCollectionDto }: CreateCollectionDto) {
    const pointEntities = await this.collectionsRepository.findBy({
      id: In(points),
    })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...createCollectionDto,
        points: pointEntities,
      }),
      relations: [`points`],
    })
  }

  findAll() {
    return this.collectionsRepository.find({ relations: [`points`] })
  }

  findOne(id: number) {
    return this.collectionsRepository.findOne({
      where: { id },
      relations: [`points`],
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
