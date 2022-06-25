import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

/**
 * On connect
 */
stan.on('connect', async () => {
    console.log('Publisher connected to NATS');

    const publisher = new TicketCreatedPublisher(stan);
    await publisher.publish({
        id: '123',
        title: 'concert',
        price: 20,
    });

    // const data = JSON.stringify({
    //     id: '123',
    //     time: new Date().toLocaleDateString(),
    //     price: 20,
    // });

    // stan.publish('ticket:created', data, () => {
    //     console.log('Event published', data);
    // });
});
/**
 * On disconnect
 */
stan.on('disconnect', () => {
    console.log('Publisher disconnected to NATS');
});

stan.on('close', () => {
    console.log('NATS Connection closed!');
    process.exit();
});

process.on('SIGTERM', () => stan.close());
process.on('SIGINT', () => stan.close());
