import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { HttpService } from '@nestjs/axios'
import { Place } from 'places/entities/place.entity'
import { CollectionType } from 'collections/entities/collection.entity'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'
import { GetPlacesQueryDto } from './dto/get-places-query.dto'
import { PlaceCollection } from 'collections/entities/place-collection.entity'
import { CollectionsService } from 'collections/collections.service'
import { FindPlaceByOsmDataParamsDto } from './dto/find-place-by-osm-data-params.dto'
import { lastValueFrom } from 'rxjs'
import { FastifyRequest } from 'fastify'

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,

    @InjectRepository(PlaceCollection)
    private placeCollectionRepository: Repository<PlaceCollection>,

    @Inject(forwardRef(() => CollectionsService))
    private readonly collectionsService: CollectionsService,

    private readonly httpService: HttpService,
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

  async findOneByOsmData(
    findPlaceByOsmDataParamsDto: FindPlaceByOsmDataParamsDto,
    request: FastifyRequest,
  ) {
    const place = await this.placeRepository.findOneBy(
      findPlaceByOsmDataParamsDto,
    )

    if (!place && process.env.PLACE_LOOKUP_ENDPOINT) {
      const headers: Record<string, string> = {}

      if (request.headers.referer) {
        headers.referer = request.headers.referer
      }

      try {
        const { data } = await lastValueFrom(
          this.httpService.get<Omit<Place, `id`>>(
            process.env.PLACE_LOOKUP_ENDPOINT,
            {
              params: findPlaceByOsmDataParamsDto,
              headers,
            },
          ),
        )

        return this.create(data)
      } catch (error) {
        if (error.response.status === 404) {
          throw new NotFoundException()
        }

        if (
          error.response.status === 400 &&
          (error.response.data.message || error.response.data.message)
        ) {
          throw new BadRequestException(
            error.response.data.message || error.response.data.message,
          )
        }

        throw error
      }
    }

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
