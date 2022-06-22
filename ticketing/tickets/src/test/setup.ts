import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

let mongo: any;
jest.setTimeout(10000);

declare global {
    var signin: () => string[];
}

beforeAll(async () => {
    process.env.JWT_KEY = 'hahathisisafakekey';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({}); // Delete all collections
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // Build a JWT payload
    const payload = {
        id: '123',
        email: 'test@test.com',
    };
    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    // Build session Object
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    // return a string that is a cookie w/ encoded data
    return [`session=${base64}; path=/; httponly`];
};
