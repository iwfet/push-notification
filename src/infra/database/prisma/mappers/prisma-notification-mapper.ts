import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
  static convertToEntity<T>(obj: any): Entity<T> {
    return new Entity<T>(obj);
  }
}

class Entity<T> {
  constructor(data: T) {
    Object.assign(this, data);
  }
  getData(): T {
    return this as unknown as T;
  }
}
