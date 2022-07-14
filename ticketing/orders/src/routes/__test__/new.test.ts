import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('returns an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId,
        })
        .expect(404);
});
it('returns an error if the ticket is reserved', async () => {
    const ticketId = new mongoose.Types.ObjectId().toString();
    const ticket = Ticket.build({
        id: ticketId,
        title: 'test',
        price: 20,
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: 'testuser',
        status: OrderStatus.Created,
        expiresAt: new Date(),
    });
    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id })
        .expect(400);
});
it('returns an 201 if the ticket is available', async () => {
    const ticketId = new mongoose.Types.ObjectId().toString();
    // Create a ticket
    const ticket = Ticket.build({
        id: ticketId,
        title: 'test',
        price: 20,
    });
    await ticket.save();
    // Create an order
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it('emits an order created event', async () => {
    const ticketId = new mongoose.Types.ObjectId().toString();
    // Create a ticket
    const ticket = Ticket.build({
        id: ticketId,
        title: 'test',
        price: 20,
    });
    await ticket.save();
    // Create an order
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id })
        .expect(201);
    // Check if the event has been emit
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
