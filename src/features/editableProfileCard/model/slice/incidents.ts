import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Incident, IncidentsSchema } from '@/features/editableProfileCard/model/types/incidentsSchema';
import { fetchIncidentData } from '@/features/editableProfileCard/model/services/fetchIncidentData/fetchIncidentData';
import { fetchIncidentByStopWordsData } from '@/features/editableProfileCard/model/services/fetchIncidentByStopWordsData/fetchIncidentByStopWordsData';

const initialState: IncidentsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const incidentSlice = createSlice({
    name: 'incident',
    initialState,
    reducers: {
        updateIncident: (state, action: PayloadAction<Incident>) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncidentData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchIncidentData.fulfilled,
                (state, action: PayloadAction<Incident[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchIncidentData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const incidentByStopWordsSlice = createSlice({
    name: 'incidentByStopWords',
    initialState,
    reducers: {
        updateIncident: (state, action: PayloadAction<Incident>) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncidentByStopWordsData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchIncidentByStopWordsData.fulfilled,
                (state, action: PayloadAction<Incident[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchIncidentByStopWordsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { actions: incidentActions } = incidentSlice;
export const { reducer: incidentReducer } = incidentSlice;

export const { actions: incidentStopActions } = incidentByStopWordsSlice;
export const { reducer: incidentStopReducer } = incidentByStopWordsSlice;
