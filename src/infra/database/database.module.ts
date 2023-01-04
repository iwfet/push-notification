import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/app/repository/notificationsRepository';
import { PrismaService } from './prisma/prisma.service';
import { prismaNotificationsRepositoryImpl } from './prisma/repositoryImpl/prismaNotificationsRepositoryImpl';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: prismaNotificationsRepositoryImpl,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
