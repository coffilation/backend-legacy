import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { UpdatePlaceDto } from './dto/update-place.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ArrayContainedBy, ArrayContains, In, Repository } from 'typeorm'
import { Place } from 'places/entities/place.entity'
import { Collection } from 'collections/entities/collection.entity'

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

  findAll() {
    return this.placeRepository.find()
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

  async update(osmId: number, updatePlaceDto: UpdatePlaceDto) {
    return this.placeRepository.findOneBy(
      await this.placeRepository.save({ ...updatePlaceDto, osmId }),
    )
  }

  async remove(id: number) {
    await this.placeRepository.delete(id)
  }
}
