import { test } from '../app';

it('should return module-mock', () => {
    expect(test()).toEqual('module-mock');
});
