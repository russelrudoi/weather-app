import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import fetchCurrentHourlyWeather from '../../thunks/fetchCurrentHourlyWeather/fetchCurrentHourlyWeather';
import IHourlyWeather from '../../../models/IHourlyWeather';

export interface CurrentWeather {
    hourlyWeather: IHourlyWeather;
    isLoadingHourlyWeather: boolean;
    errorHourlyWeather: string | null;
}

const initialState: CurrentWeather = {
    hourlyWeather: { timezone_offset: 25200, hourly: [{ temp: 10 }] },
    isLoadingHourlyWeather: false,
    errorHourlyWeather: null
};

const currentHourlyWeatherSlice = createSlice({
    name: 'currentHourlyWeather',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentHourlyWeather.pending, state => {
                state.isLoadingHourlyWeather = true;
                state.errorHourlyWeather = null;
            })
            .addCase(fetchCurrentHourlyWeather.fulfilled, (state, action) => {
                state.isLoadingHourlyWeather = false;
                state.hourlyWeather = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoadingHourlyWeather = false;
                state.errorHourlyWeather = action.payload;
            });
    }
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export default currentHourlyWeatherSlice.reducer;
