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
} from '@nestjs/common'
import { CollectionsService } from './collections.service'
import { CreateCollectionDto } from './dto/create-collection.dto'
import { UpdateCollectionDto } from './dto/update-collection.dto'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { User } from 'common/decorators/user.decorator'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'
import { CollectionPlacesDto } from 'collections/dto/collection-places.dto'
import { UnsafeExtractUserJwtAuthGuard } from '../auth/guards/unsafe-extract-user-jwt-auth.guard'

@ApiTags(`collections`)
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto, @User() author) {
    return this.collectionsService.create(createCollectionDto, author)
  }

  @ApiBearerAuth()
  @UseGuards(UnsafeExtractUserJwtAuthGuard)
  @Get()
  @ApiQuery({ name: `authorId`, type: `number`, required: false })
  findAll(@Query(`authorId`) authorId, @User() user) {
    return this.collectionsService.findAll(authorId, user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(+id)
  }

  @Post(':id/add-places')
  addPlaces(
    @Param('id') id: string,
    @Body() collectionPlacesDto: CollectionPlacesDto,
  ) {
    return this.collectionsService.addPlaces(+id, collectionPlacesDto)
  }

  @Post(':id/remove-places')
  removePlaces(
    @Param('id') id: string,
    @Body() collectionPlacesDto: CollectionPlacesDto,
  ) {
    return this.collectionsService.removePlaces(+id, collectionPlacesDto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(+id, updateCollectionDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  join(@Param('id') id: string, @User() user) {
    return this.collectionsService.join(+id, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id)
  }
}
