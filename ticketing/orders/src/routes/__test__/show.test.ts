import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('return the order when user owns the order', async () => {
    // Create a ticket
    const ticket = Ticket.build({
        title: 'test',
        price: 20,
    });
    await ticket.save();

    const user = global.signin();
    // make a request to build an order with this ticket
    const { body: orderBody } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);
    // make request to fetch the order

    const { body: fetchOrderBody } = await request(app)
        .get(`/api/orders/${orderBody.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    // Log the body
    // console.log(orderBody);
    // console.log(fetchOrderBody);
    expect(orderBody.id).toBeDefined();
    expect(fetchOrderBody.id).toBeDefined();
    expect(orderBody.id).toEqual(fetchOrderBody.id);
});
it('return an error when user1 trying to fetch order from user2', async () => {
    // Create a ticket
    const ticket = Ticket.build({
        title: 'test',
        price: 20,
    });
    await ticket.save();

    const user1 = global.signin();
    const user2 = global.signin();
    // make a request to build an order with this ticket
    const { body: orderBody } = await request(app)
        .post('/api/orders')
        .set('Cookie', user1)
        .send({ ticketId: ticket.id })
        .expect(201);
    // make request to fetch the order

    const { body: fetchOrderBody } = await request(app)
        .get(`/api/orders/${orderBody.id}`)
        .set('Cookie', user2)
        .send()
        .expect(401);

    // Log the body
    // console.log(orderBody);
    // console.log(fetchOrderBody);
});
it('return 404 when the order is not found or reserved', async () => {
    const { body: fetchOrderBody } = await request(app)
        .get(`/api/orders/${new mongoose.Types.ObjectId().toString()}`)
        .set('Cookie', global.signin())
        .send()
        .expect(404);

    // Log the body
    // console.log(fetchOrderBody);
});
it('return 401 when user is not log in', async () => {
    const { body: fetchOrderBody } = await request(app)
        .get(`/api/orders/${new mongoose.Types.ObjectId().toString()}`)
        .send()
        .expect(401);

    // Log the body
    // console.log(fetchOrderBody);
});
