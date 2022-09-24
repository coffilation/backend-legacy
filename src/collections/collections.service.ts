import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import {
  Collection,
  CollectionType,
} from 'collections/entities/collection.entity'
import { FindOptionsWhere, In, Not, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'
import { User } from 'users/entities/user.entity'
import { CollectionPlacesDto } from 'collections/dto/collection-places.dto'
import { Place } from 'places/entities/place.entity'
import { UserCollection, UserRole } from './entities/user-collection.entity'

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,

    @InjectRepository(Place)
    private placesRepository: Repository<Place>,

    @InjectRepository(UserCollection)
    private userCollectionRepository: Repository<UserCollection>,
  ) {}

  async create(
    { places, ...createCollectionDto }: CreateCollectionDto,
    user: User,
  ) {
    const placeEntities = await this.placesRepository.findBy({
      id: In(places),
    })

    const collection = await this.collectionsRepository.save({
      ...createCollectionDto,
      places: placeEntities,
      authorId: user.id,
    })

    await this.userCollectionRepository.save({
      collection,
      user,
      role: UserRole.Owner,
    })

    return this.collectionsRepository.findOne({
      where: {},
      relations: { places: true, author: true },
    })
  }

  findAll(authorId: number | undefined, user: User | undefined) {
    const findOptionsWhere: FindOptionsWhere<Collection>[] = [
      { authorId, type: CollectionType.Public },
    ]

    if (user) {
      findOptionsWhere.push({ authorId: user.id })
    }

    return this.collectionsRepository.find({
      relations: { places: true, author: true },
      where: findOptionsWhere,
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

  async join(id: number, user: User) {
    const collection = await this.collectionsRepository.findOne({
      where: { id, type: CollectionType.Public },
    })

    if (!collection) {
      throw new NotFoundException()
    }

    await this.userCollectionRepository.save({ user, collection })

    return
  }

  async remove(id: number) {
    await this.collectionsRepository.delete(id)
  }
}
