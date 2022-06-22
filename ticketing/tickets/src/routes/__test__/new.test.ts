import request from 'supertest';
import { app } from '../../app';

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
it('returns an error if an invalid title is provided', async () => {});
it('creates a ticket with valid inputs', async () => {});
