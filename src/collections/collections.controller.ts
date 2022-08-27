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

  @Get()
  @ApiQuery({ name: `authorId`, type: `number`, required: false })
  findAll(@Query(`authorId`) authorId) {
    return this.collectionsService.findAll(authorId)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id)
  }
}
