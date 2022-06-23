import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a router handler listening to /api/tickets for post request', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
});
it('can only be accessed if the user is signed in', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).toEqual(401);
});
it('if user is signedin should return 200', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});
it('returns an error if an invalid title is provided', async () => {
    // Send an empty title
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        })
        .expect(400);
    // Not sending a title
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10,
        })
        .expect(400);
});
it('returns an error if an invalid price is provided', async () => {
    // Send an empty title
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: -10,
        })
        .expect(400);
    // Not sending a title
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test',
        })
        .expect(400);
});
it('creates a ticket with valid inputs', async () => {
    const title = 'test';
    const price = 10;
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    // Add a check to make sure a ticket was saved
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
});
