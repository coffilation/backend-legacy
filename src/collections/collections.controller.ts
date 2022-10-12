import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common'
import { CollectionsService } from './collections.service'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { UpdateCollectionDto } from './dto/update-collection.dto'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtUserId } from 'common/decorators/user.decorator'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'
import { CollectionPlacesDto } from 'collections/dto/collection-places.dto'
import { UnsafeExtractUserJwtAuthGuard } from '../auth/guards/unsafe-extract-user-jwt-auth.guard'

@ApiTags(`collections`)
@Controller('collections')
@UseGuards(UnsafeExtractUserJwtAuthGuard)
@ApiBearerAuth()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCollectionDto: CreateCollectionDto,
    @JwtUserId() authorId: number,
  ) {
    return this.collectionsService.create(createCollectionDto, authorId)
  }

  @Get()
  @ApiQuery({ name: `authorId`, type: `number`, required: false })
  findAll(@Query(`authorId`) authorId, @JwtUserId() userId: number) {
    return this.collectionsService.findAll(authorId, userId)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @JwtUserId() userId: number) {
    return this.collectionsService.findOne(id, userId)
  }

  @Get(':id/places')
  findAllPlaces(
    @Param('id', ParseIntPipe) id: number,
    @JwtUserId() userId: number,
  ) {
    return this.collectionsService.findAllPlaces(id, userId)
  }

  @HttpCode(200)
  @Post(':id/add-places')
  addPlaces(
    @Param('id', ParseIntPipe) id: number,
    @Body() collectionPlacesDto: CollectionPlacesDto,
    @JwtUserId() userId: number,
  ) {
    return this.collectionsService.addPlaces(id, collectionPlacesDto, userId)
  }

  @HttpCode(200)
  @Post(':id/remove-places')
  removePlaces(
    @Param('id', ParseIntPipe) id: number,
    @Body() collectionPlacesDto: CollectionPlacesDto,
    @JwtUserId() userId: number,
  ) {
    return this.collectionsService.removePlaces(id, collectionPlacesDto, userId)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @JwtUserId() userId: number,
  ) {
    return this.collectionsService.update(id, updateCollectionDto, userId)
  }

  // @Post(':id/join')
  // join(@Param('id') id: string, @JwtUserId() user) {
  //   return this.collectionsService.join(+id, user)
  // }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.remove(id)
  }
}
