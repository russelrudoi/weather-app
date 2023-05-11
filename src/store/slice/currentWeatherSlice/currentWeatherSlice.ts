import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWeather } from '../../../models/IWeather';
import fetchCurrentWeather from '../../thunks/fetchCurrentWeather/fetchCurrentWeather';

import updateCurrentWeather from '../../thunks/updateCurrentWeather/updateCurrentWeather';
import addCurrentWeather from '../../thunks/addCurrentWeather/addCurrentWeather';
import {
    addToLocalStorage,
    removeFromLocalStorage
} from '../../../utils/localStorageUtility/localStorageUtility';

export interface CurrentWeather {
    weather: IWeather[];
    isLoadingNewWeather: boolean;
    isLoadingWeather: boolean;
    errorWeather: string | null;
}

const initialState: CurrentWeather = {
    weather: [],
    isLoadingNewWeather: false,
    isLoadingWeather: false,
    errorWeather: null
};

const currentWeatherSlice = createSlice({
    name: 'currentWeather',
    initialState,
    reducers: {
        removeWeatherItem: (store, action: PayloadAction<number>) => {
            store.weather = store.weather.filter(
                item => item.id !== action.payload
            );
            removeFromLocalStorage(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentWeather.pending, state => {
                state.isLoadingWeather = true;
                state.errorWeather = null;
            })
            .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
                state.isLoadingWeather = false;
                state.weather.push(action.payload);
                addToLocalStorage(action.payload.name, action.payload.id);
            })
            .addCase(updateCurrentWeather.pending, state => {
                state.errorWeather = null;
                state.isLoadingWeather = true;
            })
            .addCase(updateCurrentWeather.fulfilled, (state, action) => {
                state.isLoadingWeather = false;

                state.weather = state.weather.map(item => {
                    if (item.id === action.payload.id) {
                        action.payload.isUpdate = true;
                        return action.payload;
                    }
                    return item;
                });
            })
            .addCase(addCurrentWeather.pending, state => {
                state.isLoadingNewWeather = true;
                state.errorWeather = null;
            })
            .addCase(addCurrentWeather.fulfilled, (state, action) => {
                state.isLoadingNewWeather = false;
                const index = state.weather.findIndex(
                    obj => obj.id === action.payload.id
                );
                if (index === -1) {
                    state.weather.push(action.payload);
                    addToLocalStorage(action.payload.name, action.payload.id);
                } else {
                    state.errorWeather = 'The city already exists';
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoadingWeather = false;
                state.errorWeather = action.payload;
            });
    }
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const { removeWeatherItem } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
