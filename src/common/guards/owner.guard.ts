import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Type } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { ROLE } from '../enums/role.enum'

export function OwnerGuard(resourceName: string): Type<CanActivate> {
  @Injectable()
  class OwnerGuardWithResource implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()
      const user = request.user
      if (user && user.role === ROLE.ADMIN) return true

      const resourceId = request.params.id

      const resource = await this.prisma[resourceName].findUnique({
        where: { id: Number(resourceId) },
        select: { userId: true },
      })

      if (!resource || resource.createdBy !== user.id || !resource.collabrations.includes(user.id)) {
        throw new ForbiddenException('You dont have permission to edit this resource')
      }

      return true
    }
  }

  return OwnerGuardWithResource
}
