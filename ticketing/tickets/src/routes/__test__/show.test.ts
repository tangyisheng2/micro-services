import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('it returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).get(`/api/tickets/${id}`).send();
    // .expect(404);
    // console.log(response.body);
    expect(response.statusCode).toEqual(404);
});
it('it returns a ticket if ticket is found', async () => {
    const title = 'test';
    const price = 10;
    // Create a ticket first
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201);
    // console.log('Show tickets - response', response.body);
    // console.log(response.body.id);

    // Fetch the ticket
    const tempResponse = await Ticket.findById(response.body.id);
    expect(tempResponse?.title).toEqual(response.body.title);
    expect(tempResponse?.price).toEqual(response.body.price);
    // console.log(tempResponse);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    console.log('Show tickets - ticketResponse', ticketResponse.body);
    expect(ticketResponse.body.title).toEqual(response.body.title);
    expect(ticketResponse.body.price).toEqual(response.body.price);
});
