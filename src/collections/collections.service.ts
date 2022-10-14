import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCollectionDto } from './dto/create-collection.dto'
import {
  Collection,
  CollectionType,
} from 'collections/entities/collection.entity'
import { In, Repository } from 'typeorm'
import { UpdateCollectionDto } from 'collections/dto/update-collection.dto'
import { UserCollection, UserRole } from './entities/user-collection.entity'
import { PlaceCollection } from './entities/place-collection.entity'
import { GetCollectionsQueryDto } from './dto/get-collections-query.dto'
import { PlacesService } from '../places/places.service'
import { UpdateCollectionPlacesDto } from './dto/update-collection-places.dto'

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,

    @InjectRepository(UserCollection)
    private userCollectionRepository: Repository<UserCollection>,

    @InjectRepository(PlaceCollection)
    private placeCollectionRepository: Repository<PlaceCollection>,

    @Inject(forwardRef(() => PlacesService))
    private readonly placesService: PlacesService,
  ) {}

  async create(
    { ...createCollectionDto }: CreateCollectionDto,
    userId: number,
  ): Promise<Collection> {
    const collection = await this.collectionsRepository.save({
      ...createCollectionDto,
      authorId: userId,
    })

    await this.userCollectionRepository.save({
      collection,
      userId,
      role: UserRole.Owner,
    })

    return collection
  }

  findAll(
    jwtUserId: number | undefined,
    { userId, placeOsmId }: GetCollectionsQueryDto,
  ) {
    return this.collectionsRepository.find({
      where: [
        {
          placeCollections: { placeOsmId },
          type: CollectionType.Public,
          userCollections: { userId },
        },
        {
          placeCollections: { placeOsmId },
          type: CollectionType.Private,
          userCollections: {
            userId: jwtUserId,
            collection: { userCollections: { userId } },
          },
        },
      ],
      relations: {
        author: true,
        userCollections: true,
        placeCollections: true,
      },
    })
  }

  async findOne(id: number, userId: number) {
    const collection = await this.collectionsRepository.findOne({
      where: [
        { id, authorId: userId, type: CollectionType.Private },
        { id, type: CollectionType.Public },
      ],
      relations: { author: true },
    })

    if (!collection) {
      throw new NotFoundException()
    }

    return collection
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

  async remove(id: number) {
    await this.collectionsRepository.delete(id)
  }

  async updateCollectionPlaces(
    jwtUserId: number,
    collectionId: number,
    { placeOsmIds }: UpdateCollectionPlacesDto,
  ) {
    await this.findOne(collectionId, jwtUserId)

    await this.placeCollectionRepository.delete({
      collectionId,
      placeOsmId: In(
        placeOsmIds.filter((osmId) => !placeOsmIds.includes(osmId)),
      ),
    })

    await this.placeCollectionRepository.save(
      placeOsmIds
        .filter((osmId) => placeOsmIds.includes(osmId))
        .map((osmId) => ({
          collectionId,
          placeOsmId: osmId,
        })),
    )

    return this.placesService.findAll(jwtUserId, {
      collectionId,
    })
  }
}
