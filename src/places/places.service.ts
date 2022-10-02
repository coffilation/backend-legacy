import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { UpdatePlaceDto } from './dto/update-place.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Place } from 'places/entities/place.entity'
import { Collection } from 'collections/entities/collection.entity'
import { UpdatePlaceCollectionsDto } from './dto/update-place-collections.dto'

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,

    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    return this.placeRepository.findOneBy(
      await this.placeRepository.save({
        ...createPlaceDto,
      }),
    )
  }

  findAll(authorId: number) {
    return this.placeRepository.find({
      where: { collections: { authorId } },
    })
  }

  findOne(osmId: number) {
    return this.placeRepository.findOneBy({ osmId })
  }

  async findPlaceCollections(osmId: number) {
    const place = await this.placeRepository.findOne({
      where: { osmId },
      relations: { collections: true },
    })

    if (!place) {
      throw new NotFoundException()
    }

    return place.collections
  }

  async updatePlaceCollections(
    osmId: number,
    { collectionIds }: UpdatePlaceCollectionsDto,
  ) {
    const place = await this.placeRepository.findOne({
      where: { osmId },
      relations: { collections: true },
    })

    if (!place) {
      throw new NotFoundException()
    }

    const collections = await this.collectionsRepository.findBy({
      id: In(collectionIds),
    })

    await this.placeRepository.save({ ...place, collections })

    return (
      await this.placeRepository.findOne({
        where: { osmId },
        relations: { collections: true },
      })
    ).collections
  }

  async update(osmId: number, updatePlaceDto: UpdatePlaceDto) {
    const place = this.placeRepository.findOneBy({ osmId })

    return this.placeRepository.save({ ...place, ...updatePlaceDto })
  }

  async remove(osmId: number) {
    await this.placeRepository.delete({ osmId })
  }

  findPlaces(osmIds: number[]) {
    return this.placeRepository.findBy({ osmId: In(osmIds) })
  }
}
