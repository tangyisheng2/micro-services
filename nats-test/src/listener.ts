import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
import { listeners } from 'process';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listenning to NATS');
    // const options = stan
    //     .subscriptionOptions()
    //     .setManualAckMode(true)
    //     .setDeliverAllAvailable()
    //     .setDurableName('order-service')
    //     .setAckWait(1000);
    // const subscription = stan.subscribe(
    //     'ticket:created',
    //     'orders-service-queue-group',
    //     options
    // );

    new TicketCreatedListener(stan).listen();
});

abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, message: Message): void;

    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setManualAckMode(true)
            .setDeliverAllAvailable()
            .setDurableName('order-service')
            .setAckWait(1000);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject}/${
                    this.queueGroupName
                }: ${msg.getData()}`
            );

            const parseData = this.parseMessage(msg);
            this.onMessage(parseData, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
}

class TicketCreatedListener extends Listener {
    subject: string = 'ticket:created';
    queueGroupName: string = 'payments-service';

    onMessage(data: any, message: nats.Message): void {
        console.log('Event data:', data);
        // If things goes correctly
        message.ack();
    }
}
