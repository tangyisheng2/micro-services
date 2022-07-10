import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    // Need to provide a type annotation to make sure that we are not
    // Changing the value in the future
    // Or we can use readonly modifier
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName: string = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], message: Message): void {
        console.log('Event data:', data);
        // If things goes correctly
        message.ack();
    }
}
export default TicketCreatedListener;
