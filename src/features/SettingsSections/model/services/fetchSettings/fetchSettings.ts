import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { isJsonModeServer } from '@/shared/const/global';
import { Agency, UpdateUserDto } from '@/features/SettingsSections/model/types/settingsSchema';
import { getSettingsForm } from '@/features/SettingsSections/model/selectors/getSettingsForm/getSettingsForm';
import { TUserSettingsNotifications } from '@/entities/User/model/types/settings';
import { getUserAuthData, User } from '@/entities/User';
import { useSelector } from 'react-redux';
import { getAccountsPageLimit } from '@/pages/AccountsPage/model/selectors/accountsPageSelectors';

export const fetchSettings = createAsyncThunk<
    User,
    UpdateUserDto,
    ThunkConfig<string>
    >('settings/fetchDelete', async (userSettings, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());

    try {
        const url = isJsonModeServer ? `/users/${userData?.id}?_expand=true` : `/users/${userData?.id}?_expand=true`;
        const response = await extra.api.patch<User>(url, userSettings);
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
