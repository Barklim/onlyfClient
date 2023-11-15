import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { isJsonModeServer } from '@/shared/const/global';
import { Agency } from '@/features/SettingsStopWords/model/types/settingsSchema';
import { getSettingsForm } from '@/features/SettingsStopWords/model/selectors/getSettingsForm/getSettingsForm';

export const fetchSettingsAgency = createAsyncThunk<
    Agency,
    void,
    ThunkConfig<string>
    >('agency/fetchSettingsAgency', async (agencyData, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getSettingsForm(getState());
    const preparedData = {
        name: formData?.name,
        stopWords: formData?.stopWords
    }

    try {
        const url = isJsonModeServer ? '/agency' : '/agency';
        const response = await extra.api.patch<Agency>(url, preparedData);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);

        // @ts-ignore
        const message = e.response.data.message
        if (typeof message === 'string') {
            return rejectWithValue(message);
        } else {
            const resultString = message.join(', ');
            return rejectWithValue(resultString);
        }
    }
});
