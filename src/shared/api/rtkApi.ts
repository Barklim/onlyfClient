import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY, ACCESS_TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { isJsonModeServer } from '@/shared/const/global';

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
        if (isJsonModeServer) {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

            if (token) {
                headers.set('Authorization', token);
            }

            return headers;
        } else {
           const token =  localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY) || '';

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // console.log('!!! baseQueryWithReauth');
    // console.log(api);
    // console.log(args);
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery('/authentication/refresh-tokens', api, extraOptions);

        // TODO: REFRESH
        if (refreshResult.data) {
            // api.dispatch(tokenReceived(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            // api.dispatch(loggedOut());
        }
    }
    return result;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth, // Используем middleware для базовых запросов
    endpoints: (builder) => ({}),
});