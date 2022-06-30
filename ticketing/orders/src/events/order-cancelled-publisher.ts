import {
    OrderCancelledEvent,
    Publisher,
    Subjects,
} from '@tangyisheng2-ticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
