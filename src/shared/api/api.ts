import axios from 'axios';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { isJsonModeServer } from '@/shared/const/global';

export const $api = axios.create({
    baseURL: __API__,
});

// TODO: REFRESH
$api.interceptors.request.use((config) => {
    if (config.headers) {
        if (isJsonModeServer) {
            config.headers.Authorization =
                localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
        } else {
            const token =  localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY) || '';
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
