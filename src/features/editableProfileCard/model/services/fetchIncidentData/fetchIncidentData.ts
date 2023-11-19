import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Incident } from '@/features/editableProfileCard/model/types/incidentsSchema';

export const fetchIncidentData = createAsyncThunk<
    Incident[],
    string,
    ThunkConfig<string>
    >('incident/fetchIncidentData', async (managerId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const url = `/incident/report?managerId=${managerId}`
        const response = await extra.api.get<Incident[]>(url);

        if (!response.data) {
            throw new Error();
        }

        const responseDataArray = response.data as Incident[];

        const updatedDataArray = responseDataArray.map((object: Incident) => {
            const utcDate = new Date(object.incident_created_at);
            const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
            const userTimeZoneDate = new Date(utcDate.getTime() - timezoneOffsetInMinutes * 60 * 1000);

            return { ...object, incident_created_at: userTimeZoneDate.toISOString() };
        });

        return updatedDataArray;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
