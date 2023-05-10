import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWeather } from '../../models/IWeather';
import fetchCurrentWeather from '../thunks/fetchCurrentWeather';

import updateCurrentWeather from '../thunks/updateCurrentWeather';
import addCurrentWeather from '../thunks/addCurrentWeather';
import {
    addToLocalStorage,
    removeFromLocalStorage
} from '../../services/localStorageService';

interface CurrentWeather {
    weather: IWeather[];
    isLoadingNewWeather: boolean;
    isLoadingWeather: boolean;
    errorAddWeather: string | null;
    errorWeather: string | null;
}

const initialState: CurrentWeather = {
    weather: [],
    isLoadingNewWeather: false,
    isLoadingWeather: false,
    errorAddWeather: null,
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
            .addCase(updateCurrentWeather.pending, (state, action) => {
                const index = state.weather.findIndex(
                    obj => obj.id === +action.meta.arg
                );
                state.weather[index].isUpdate = true;
            })
            .addCase(updateCurrentWeather.fulfilled, (state, action) => {
                const index = state.weather.findIndex(
                    obj => obj.id === action.payload.id
                );
                if (index !== -1) {
                    state.errorWeather = '';
                    state.weather[index].isUpdate = true;
                    state.weather[index] = action.payload;
                }
            })
            .addCase(addCurrentWeather.pending, state => {
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
