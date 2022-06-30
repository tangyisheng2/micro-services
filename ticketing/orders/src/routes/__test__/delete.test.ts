import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('marks an order as cancelled', async () => {
    // create a ticket with Ticket Model
    const ticket = Ticket.build({
        title: 'test',
        price: 20,
    });
    await ticket.save();

    const user = global.signin();
    // make a request to create an order
    const { body: orderBody } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    // make a request to cancel the order
    // Does not return an update order object
    const { body: cancelledOrderBody } = await request(app)
        .delete(`/api/orders/${orderBody.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    // expectation to make sure the thing is cancelled
    const updatedOrder = await Order.findById(orderBody.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

    // Log the response body
    // console.log(ticket);
    // console.log(orderBody);
    // console.log(cancelledOrderBody); // Will not return the updated object
    // console.log(updatedOrder);
});

it.todo('it emits a order cancelled event');
