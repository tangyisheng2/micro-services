import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price });
};

it('Should return a list of tickets', async () => {
    await createTicket('test1', 10);
    await createTicket('test2', 20);
    await createTicket('test3', 30);
    const response = await request(app).get('/api/tickets').send().expect(200);

    // Log the data of the ticket list
    // console.log(response.body);

    expect(response.body.length).toEqual(3);
});
