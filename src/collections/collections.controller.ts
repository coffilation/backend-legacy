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
import { AddPointDto } from "collections/dto/add-point.dto";

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

  @Post(':id/add-point')
  addPoint(@Param('id') id: string, @Body() addPointDto: AddPointDto) {
    return this.collectionsService.addPoint(+id, addPointDto)
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
