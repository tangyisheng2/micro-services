import request from 'supertest';
import { app } from '../../app';

it('response the details about the current user', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();

    const currentUserInfo = response.get('Set-Cookie');

    const currentUserResponse = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', currentUserInfo)
        .send()
        .expect(200);

    expect(currentUserResponse.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(401);
    expect(response.body[0].message).toEqual('Not Authorized');
});
