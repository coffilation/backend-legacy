import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import {
  Collection,
  CollectionType,
} from 'collections/entities/collection.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'
import { CollectionPlacesDto } from 'collections/dto/collection-places.dto'
import { UserCollection, UserRole } from './entities/user-collection.entity'
import { PlacesService } from '../places/places.service'

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,

    @InjectRepository(UserCollection)
    private userCollectionRepository: Repository<UserCollection>,

    private readonly placesService: PlacesService,
  ) {}

  async create(
    { places, ...createCollectionDto }: CreateCollectionDto,
    userId: number,
  ): Promise<Collection> {
    const placeEntities = await this.placesService.findPlaces(places)

    const collection = await this.collectionsRepository.save({
      ...createCollectionDto,
      places: placeEntities,
      authorId: userId,
    })

    await this.userCollectionRepository.save({
      collection,
      userId,
      role: UserRole.Owner,
    })

    return collection
  }

  findAll(authorId: number | undefined, userId: number | undefined) {
    const findOptionsWhere: FindOptionsWhere<Collection>[] = [
      { authorId, type: CollectionType.Public },
    ]

    if (userId) {
      findOptionsWhere.push({ authorId: userId })
    }

    return this.collectionsRepository.find({
      relations: { places: true, author: true },
      where: findOptionsWhere,
    })
  }

  async findOne(id: number, authorId: number) {
    const collection = await this.collectionsRepository.findOne({
      where: [
        { id, authorId },
        { id, type: CollectionType.Public },
      ],
      relations: { places: true, author: true },
    })

    if (!collection) {
      throw new NotFoundException()
    }

    return collection
  }

  async addPlaces(
    collectionId: number,
    { placeIds }: CollectionPlacesDto,
    userId: number,
  ) {
    const collection = await this.findOne(collectionId, userId)

    const places = await this.placesService.findPlaces(placeIds)

    collection.places.push(...places)

    return this.collectionsRepository.save(collection)
  }

  async removePlaces(
    collectionId: number,
    { placeIds }: CollectionPlacesDto,
    userId: number,
  ) {
    const collection = await this.findOne(collectionId, userId)

    collection.places = collection.places.filter(
      ({ osmId }) => !placeIds.includes(parseInt(osmId as unknown as string)),
    )

    return this.collectionsRepository.save(collection)
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
    userId: number,
  ): Promise<Collection> {
    const collection = await this.findOne(id, userId)

    return this.collectionsRepository.save({
      ...collection,
      ...updateCollectionDto,
    })
  }

  // async join(id: number, user: User) {
  //   const collection = await this.collectionsRepository.findOne({
  //     where: { id, type: CollectionType.Public },
  //   })
  //
  //   if (!collection) {
  //     throw new NotFoundException()
  //   }
  //
  //   await this.userCollectionRepository.save({ user, collection })
  // }

  async remove(id: number) {
    await this.collectionsRepository.delete(id)
  }
}
