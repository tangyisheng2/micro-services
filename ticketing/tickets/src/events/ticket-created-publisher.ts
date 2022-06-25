import {
    Publisher,
    Subjects,
    TicketCreatedEvent,
} from '@tangyisheng2-ticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
