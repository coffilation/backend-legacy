import {
  ForbiddenException,
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
import { PlacesService } from 'places/places.service'
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

  roleAssignationAbilities = {
    [UserRole.Member]: [UserRole.Member],
    [UserRole.Editor]: [UserRole.Member],
    [UserRole.Admin]: [UserRole.Member, UserRole.Editor, UserRole.Admin],
    [UserRole.Owner]: [UserRole.Member, UserRole.Editor, UserRole.Admin],
  }

  async create(
    { ...createCollectionDto }: CreateCollectionDto,
    userId: number,
  ): Promise<Collection> {
    const collection = await this.collectionsRepository.save({
      ...createCollectionDto,
      authorId: userId,
    })

    await this.join(collection.id, userId, UserRole.Owner)

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

  async findOneWithoutException(id: number, userId: number) {
    return await this.collectionsRepository.findOne({
      where: [
        {
          id,
          type: CollectionType.Private,
          userCollections: {
            userId: userId,
          },
        },
        { id, type: CollectionType.Public },
      ],
      relations: { author: true },
    })
  }

  async findOne(id: number, userId: number) {
    const collection = await this.findOneWithoutException(id, userId)

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
    await this.checkUserPermissions(id, userId, [
      UserRole.Editor,
      UserRole.Admin,
      UserRole.Owner,
    ])

    return this.collectionsRepository.save({
      ...collection,
      ...updateCollectionDto,
    })
  }

  async remove(jwtUserId: number, collectionId: number) {
    await this.checkUserPermissions(collectionId, jwtUserId, [UserRole.Owner])

    await this.collectionsRepository.delete(collectionId)
  }

  async updateCollectionPlaces(
    jwtUserId: number,
    collectionId: number,
    { placeOsmIds }: UpdateCollectionPlacesDto,
  ) {
    await this.findOne(collectionId, jwtUserId)
    await this.checkUserPermissions(collectionId, jwtUserId, [
      UserRole.Editor,
      UserRole.Admin,
      UserRole.Owner,
    ])

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

  async findOneUserCollection(collectionId: number, userId: number) {
    const userCollection = await this.userCollectionRepository.findOneBy({
      collectionId,
      userId,
    })

    if (!userCollection) {
      throw new ForbiddenException()
    }

    return userCollection
  }

  async checkUserPermissions(
    collectionId: number,
    userId: number,
    allowedPermissions: UserRole[],
  ) {
    console.log(
      userId,
      allowedPermissions,
      (await this.findOneUserCollection(collectionId, userId)).role,
      await this.collectionsRepository.findOne({
        where: { id: collectionId },
        relations: { userCollections: true },
      }),
      (
        await this.collectionsRepository.findOne({
          where: { id: collectionId },
          relations: { userCollections: { user: true } },
        })
      ).userCollections?.[0].user,
    )
    if (
      !allowedPermissions.includes(
        (await this.findOneUserCollection(collectionId, userId)).role,
      )
    ) {
      throw new ForbiddenException()
    }
  }

  async join(collectionId: number, userId: number, role: UserRole) {
    if (await this.findOneWithoutException(collectionId, userId)) {
      throw new ForbiddenException()
    }

    await this.userCollectionRepository.save({
      collectionId,
      userId,
      role,
    })
  }
}
