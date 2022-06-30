import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCreatedEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        status: OrderStatus;
        userId: string;
        expiresAt: string; // Use string because it is better for json serailzation
        ticket: {
            id: string;
            price: number;
        };
    };
}
