import {
    Listener,
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
        // Implements a custom "findByEvent"
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error('Ticket not Found');
        }
        // Update record
        ticket.title = data.title;
        ticket.price = data.price;
        // Save
        await ticket.save();

        message.ack();
    }
}
