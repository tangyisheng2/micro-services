import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('Should return 404 when a ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'dump title',
            price: 20,
        })
        .expect(404);
});
it('Should return unauthorized when not logged in', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'dump title',
            price: 20,
        })
        .expect(401);
});
it('Should return unauthorized when user dos not own the ticket', async () => {
    const response1 = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', global.signin())
        .send({
            title: 'test title',
            price: 20,
        });

    // console.log(response1.body);

    await request(app)
        .put(`/api/tickets/${response1.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test title',
            price: 20,
        })
        .expect(401);
});
it('Should return 400 if the input is not valid (invalid title and invalid price)', async () => {
    const cookie = global.signin();

    const response1 = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test title',
            price: 20,
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response1.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20,
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${response1.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'test title',
            price: -5,
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${response1.body.id}`)
        .set('Cookie', cookie)
        .send({
            price: 20,
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${response1.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'test title',
        })
        .expect(400);
});
it('Updates the ticket given the valid input', async () => {
    const cookie = global.signin();
    const newTitle = 'new title';
    const newPrice = 30;

    const response1 = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'test title',
            price: 20,
        })
        .expect(201);

    const response2 = await request(app)
        .put(`/api/tickets/${response1.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: newTitle,
            price: newPrice,
        });

    const modifiedResponse = await request(app)
        .get(`/api/tickets/${response1.body.id}`)
        .send();

    // console.log('Show tickets - ticketResponse', ticketResponse.body);
    expect(modifiedResponse.body.title).toEqual(newTitle);
    expect(modifiedResponse.body.price).toEqual(newPrice);
});
