import Listener from './base-listener';

class TicketCreatedListener extends Listener {
    subject: string = 'ticket:created';
    queueGroupName: string = 'payments-service';

    onMessage(data: any, message: nats.Message): void {
        console.log('Event data:', data);
        // If things goes correctly
        message.ack();
    }
}
export default TicketCreatedListener;
