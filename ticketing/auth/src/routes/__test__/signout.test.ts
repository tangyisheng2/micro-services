import request from 'supertest';
import { app } from '../../app';

it('responds no cookies when signed out', async () => {
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

    const respondsSignedOut = await request(app)
        .post('/api/users/signout')
        .expect(200);
    expect(respondsSignedOut.get('Set-Cookie')[0]).toEqual(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
});
