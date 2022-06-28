import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
} from '@tangyisheng2-ticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
