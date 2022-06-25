import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

/**
 * On connect
 */
stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '123',
        time: new Date().toLocaleDateString(),
        price: 20,
    });

    stan.on('close', () => {
        console.log('NATS Connection closed!');
        process.exit();
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published', data);
    });
});
/**
 * On disconnect
 */
stan.on('disconnect', () => {
    console.log('Publisher disconnected to NATS');
});

process.on('SIGTERM', () => stan.close());
process.on('SIGINT', () => stan.close());
