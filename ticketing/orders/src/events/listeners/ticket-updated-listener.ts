import {
    Listener,
    NotFoundError,
    Subjects,
    TicketUpdatedEvent,
} from '@tangyisheng2-ticket/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(
        data: TicketUpdatedEvent['data'],
        message: Message
    ): Promise<void> {
        const ticket = await Ticket.findById(data.id);

        if (!ticket) {
            throw new Error('Ticket not Found');
        }

        await ticket.save();

        message.ack();
    }
}
