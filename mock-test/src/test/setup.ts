// jest.mock('./Module');
jest.setTimeout(10000);
jest.mock('../Module');

beforeAll(async () => {});

beforeEach(async () => {
    jest.clearAllMocks();
});

afterAll(async () => {});
