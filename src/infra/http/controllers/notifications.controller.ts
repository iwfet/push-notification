import { CancelNotification } from '@app/use-cases/cancel-notification';
import { Controller, Body, Post, Get, Param, Delete } from '@nestjs/common';
import { get } from 'http';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-models';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification, private canceledNotifications:CancelNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Delete(':notificationId')
  async buscaFendById(@Param('notificationId') notificationId: string) {
   
    await this.canceledNotifications.execute({ notificationId});
  }
}
