import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch();

        // @ts-ignore
        return useMemo(
            // @ts-ignore
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
