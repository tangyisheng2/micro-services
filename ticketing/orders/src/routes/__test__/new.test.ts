import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

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
    const ticket = Ticket.build({
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
    const ticket = Ticket.build({
        title: 'test',
        price: 20,
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it.todo('emits an order created event');
