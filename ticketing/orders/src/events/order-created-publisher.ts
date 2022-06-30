import {
    OrderCreatedEvent,
    Publisher,
    Subjects,
} from '@tangyisheng2-ticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
