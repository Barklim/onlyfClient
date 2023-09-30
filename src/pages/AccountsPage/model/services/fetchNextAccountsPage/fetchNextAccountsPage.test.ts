import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextAccountsPage } from './fetchNextAccountsPage';
import { fetchAccountsList } from '../fetchAccountsList/fetchArticlesList';

jest.mock('../fetchAccountsList/fetchAccountsList');

describe('fetchNextAccountsPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextAccountsPage, {
            accountsPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchAccountsList).toHaveBeenCalled();
    });
    test('fetchAritcleList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextAccountsPage, {
            accountsPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchAccountsList).not.toHaveBeenCalled();
    });
});
