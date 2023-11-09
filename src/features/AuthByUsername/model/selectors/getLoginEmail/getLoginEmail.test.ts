import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginEmail } from './getLoginEmail';

describe('getLoginUsername.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                email: '123123',
            },
        };
        expect(getLoginEmail(state as StateSchema)).toEqual('123123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginEmail(state as StateSchema)).toEqual('');
    });
});
