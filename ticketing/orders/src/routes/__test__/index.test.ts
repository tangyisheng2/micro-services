import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'test ticket',
        price: 20,
    });

    await ticket.save();
    return ticket;
};

it('should fetch order for a particular user', async () => {
    // Create three tickets
    const ticket1 = await buildTicket();
    const ticket2 = await buildTicket();
    const ticket3 = await buildTicket();

    const user1 = global.signin();
    const user2 = global.signin();
    // Create one order as User #1

    await request(app)
        .post('/api/orders')
        .set('Cookie', user1)
        .send({ ticketId: ticket1.id })
        .expect(201);

    // Create two order as User #2
    const { body: order1 } = await request(app)
        .post('/api/orders')
        .set('Cookie', user2)
        .send({ ticketId: ticket2.id })
        .expect(201);

    const { body: order2 } = await request(app)
        .post('/api/orders')
        .set('Cookie', user2)
        .send({ ticketId: ticket3.id })
        .expect(201);

    // Make request to get orders from User #2
    const { body: user2OrderResponseBody } = await request(app)
        .get('/api/orders')
        .set('Cookie', user2)
        .expect(200);

    // Make sure only get the orders for User #2
    // console.log(ticket1);
    // console.log(ticket2);
    // console.log(order1);
    // console.log(order2);
    // console.log(user2OrderResponseBody);
    expect(user2OrderResponseBody.length).toEqual(2);

    expect(user2OrderResponseBody[0].id).toEqual(order1.id);
    expect(user2OrderResponseBody[1].id).toEqual(order2.id);

    expect(user2OrderResponseBody[0].ticket._id).toBeDefined();
    expect(user2OrderResponseBody[0].ticket._id).toEqual(ticket2.id);

    expect(user2OrderResponseBody[1].ticket._id).toBeDefined();
    expect(user2OrderResponseBody[1].ticket._id).toEqual(ticket3.id);
});
