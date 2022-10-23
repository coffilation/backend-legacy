import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { InvitesService } from './invites.service'
import { CreateInviteDto } from './dto/create-invite.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'
import { JwtUserId } from 'common/decorators/user.decorator'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags(`invites`)
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  create(
    @Query(`collectionId`) collectionId: number,
    @JwtUserId() jwtUserId: number,
    @Body() createInviteDto: CreateInviteDto,
  ) {
    return this.invitesService.create(collectionId, jwtUserId, createInviteDto)
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @JwtUserId() jwtUserId: number) {
    return this.invitesService.findOne(jwtUserId, uuid)
  }

  @Post(':uuid/accept')
  accept(@Param('uuid') uuid: string, @JwtUserId() jwtUserId: number) {
    return this.invitesService.accept(uuid, jwtUserId)
  }
}
