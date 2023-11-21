import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ActiveDialog } from '@/features/editableProfileCard/model/types/incidentsSchema';

export const fetchActiveDialogsData = createAsyncThunk<
    ActiveDialog[],
    any,
    ThunkConfig<string>
    >('incident/fetchActiveDialogsData', async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const url = `/messages/activeDialogs/${data.managerId}?mc=${data.mc}&uc=${data.uc}&tz=${data.tz}`
        const response = await extra.api.get<ActiveDialog[]>(url);

        if (!response.data) {
            throw new Error();
        }

        const responseDataArray = response.data as ActiveDialog[];

        return responseDataArray;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
