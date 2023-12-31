import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Agency } from '@/features/SettingsSections/model/types/settingsSchema';

export const fetchAgencyData = createAsyncThunk<
    Agency,
    void,
    ThunkConfig<string>
    >('agency/fetchAgencyData', async (nodata, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Agency>(`agency/me`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
