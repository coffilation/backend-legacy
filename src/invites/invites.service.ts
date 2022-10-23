import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Invite } from 'invites/entities/invite.entity'
import { CollectionsService } from 'collections/collections.service'
import { CreateInviteDto } from 'invites/dto/create-invite.dto'

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,

    @Inject(CollectionsService)
    private readonly collectionsService: CollectionsService,
  ) {}

  async create(
    collectionId: number,
    userId: number,
    { role }: CreateInviteDto,
  ) {
    const userCollection = await this.collectionsService.findOneUserCollection(
      collectionId,
      userId,
    )

    if (
      !this.collectionsService.roleAssignationAbilities[
        userCollection.role
      ].includes(role)
    ) {
      throw new ForbiddenException()
    }

    return this.inviteRepository.save({ collectionId, role })
  }

  async findOne(userId: number, uuid: string) {
    const invite = await this.inviteRepository.findOne({
      where: { uuid },
      relations: { collection: true },
    })

    if (
      await this.collectionsService.findOneWithoutException(
        invite.collectionId,
        userId,
      )
    ) {
      throw new ForbiddenException()
    }

    return invite
  }

  async accept(uuid: string, jwtUserId: number) {
    const invite = await this.findOne(jwtUserId, uuid)

    await this.collectionsService.join(
      invite.collectionId,
      jwtUserId,
      invite.role,
    )
  }
}
