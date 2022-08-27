import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { Collection } from 'collections/entities/collection.entity'
import { In, Not, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'
import { User } from 'users/entities/user.entity'
import { CollectionPlacesDto } from 'collections/dto/collection-places.dto'
import { Place } from 'places/entities/place.entity'

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,

    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
  ) {}

  async create(
    { places, ...createCollectionDto }: CreateCollectionDto,
    author: User,
  ) {
    const placeEntities = await this.placesRepository.findBy({
      id: In(places),
    })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...createCollectionDto,
        places: placeEntities,
        authorId: author.id,
      }),
      relations: { places: true, author: true },
    })
  }

  findAll(authorId?: number) {
    if (authorId) {
      return this.collectionsRepository.find({
        relations: { places: true, author: true },
        where: { authorId: authorId },
      })
    }

    return this.collectionsRepository.find({
      relations: { places: true, author: true },
    })
  }

  findOne(id: number) {
    return this.collectionsRepository.findOne({
      where: { id },
      relations: { places: true },
    })
  }

  async getCollection(collectionId: number) {
    const collection = await this.collectionsRepository.findOne({
      where: {
        id: collectionId,
      },
      relations: { places: true, author: true },
    })

    if (!collection) {
      throw new NotFoundException(
        `Collection with id ${collectionId} not found`,
      )
    }

    return collection
  }

  async addPlaces(collectionId: number, { placeIds }: CollectionPlacesDto) {
    const collection = await this.getCollection(collectionId)

    const places = await this.placesRepository.findBy({ id: In(placeIds) })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...collection,
        places: [...collection.places, ...places],
      }),
      relations: { places: true, author: true },
    })
  }

  async removePlaces(collectionId: number, { placeIds }: CollectionPlacesDto) {
    const collection = await this.getCollection(collectionId)

    const places = await this.placesRepository.findBy({ id: Not(In(placeIds)) })

    return this.collectionsRepository.findOne({
      where: await this.collectionsRepository.save({
        ...collection,
        places: places,
      }),
      relations: { places: true, author: true },
    })
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    await this.collectionsRepository.save({
      ...updateCollectionDto,
      id,
    })

    return this.collectionsRepository.findOne({
      where: { id },
      relations: { places: true },
    })
  }

  async remove(id: number) {
    await this.collectionsRepository.delete(id)
  }
}
