import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Place } from 'places/entities/place.entity'
import { CollectionType } from 'collections/entities/collection.entity'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'
import { GetPlacesQueryDto } from './dto/get-places-query.dto'
import { PlaceCollection } from 'collections/entities/place-collection.entity'
import { CollectionsService } from 'collections/collections.service'

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,

    @InjectRepository(PlaceCollection)
    private placeCollectionRepository: Repository<PlaceCollection>,

    @Inject(forwardRef(() => CollectionsService))
    private readonly collectionsService: CollectionsService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    return this.placeRepository.save({
      ...createPlaceDto,
    })
  }

  findAll(jwtUserId: number, { collectionId, userId }: GetPlacesQueryDto) {
    return this.placeRepository.find({
      where: {
        placeCollections: {
          collectionId,
          collection: [
            {
              type: CollectionType.Public,
              userCollections: { userId },
            },
            {
              type: CollectionType.Private,
              userCollections: {
                userId: jwtUserId,
                collection: { userCollections: { userId } },
              },
            },
          ],
        },
      },
      relations: {
        placeCollections: {
          collection: {
            userCollections: true,
          },
        },
      },
    })
  }

  async findOne(placeId: number) {
    const place = await this.placeRepository.findOneBy({ id: placeId })

    if (!place) {
      throw new NotFoundException()
    }

    return place
  }

  async updatePlaceCollections(
    jwtUserId: number,
    placeId: number,
    { collectionIds }: UpdatePlaceCollectionsDto,
  ) {
    await this.findOne(placeId)

    const collection = await this.collectionsService.findAll(jwtUserId, {
      userId: jwtUserId,
    })

    await this.placeCollectionRepository.delete({
      placeId,
      collectionId: In(
        collection
          .filter(({ id }) => !collectionIds.includes(id))
          .map(({ id }) => id),
      ),
    })

    const actualCollections = collection.filter(({ id }) =>
      collectionIds.includes(id),
    )

    await this.placeCollectionRepository.save(
      actualCollections.map(({ id }) => ({
        placeId,
        collectionId: id,
      })),
    )

    return actualCollections
  }
}
