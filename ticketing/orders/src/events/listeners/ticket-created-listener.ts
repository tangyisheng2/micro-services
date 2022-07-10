import {
    Listener,
    Subjects,
    TicketCreatedEvent,
} from '@tangyisheng2-ticket/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    async onMessage(
        data: TicketCreatedEvent['data'],
        message: Message
    ): Promise<void> {
        const { id, title, price } = data;

        const ticket = Ticket.build({
            id,
            title,
            price,
        });

        await ticket.save();

        message.ack();
    }
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
}
