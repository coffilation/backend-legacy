import { Module } from '@nestjs/common'
import { InvitesService } from './invites.service'
import { InvitesController } from './invites.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invite } from 'invites/entities/invite.entity'
import { CollectionsModule } from 'collections/collections.module'

@Module({
  imports: [TypeOrmModule.forFeature([Invite]), CollectionsModule],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
