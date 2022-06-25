import nats, { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}
