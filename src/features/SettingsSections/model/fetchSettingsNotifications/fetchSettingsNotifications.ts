import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { isJsonModeServer } from '@/shared/const/global';
import { Agency } from '@/features/SettingsSections/model/types/settingsSchema';
import { getSettingsForm } from '@/features/SettingsSections/model/selectors/getSettingsForm/getSettingsForm';
import { TUserSettingsNotifications } from '@/entities/User/model/types/settings';
import { User } from '@/entities/User';

export const fetchSettingsNotifications = createAsyncThunk<
    User,
    TUserSettingsNotifications,
    ThunkConfig<string>
    >('settings/fetchSettingsNotifications', async (userSettingsNotifications, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const url = isJsonModeServer ? '/users/settings/notifications' : '/users/settings/notifications';
        const response = await extra.api.post<User>(url, userSettingsNotifications);
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
