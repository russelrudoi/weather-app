import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherService } from '../../../services/WeatherService';
import IHourlyWeather from '../../../models/IHourlyWeather';

export type Coordinates = { lat: string; lon: string };

const fetchCurrentHourlyWeather = createAsyncThunk<
    IHourlyWeather,
    Coordinates,
    { rejectValue: string }
>(
    'currentHourlyWeather/fetchCurrentHourlyWeather',
    async function (payload: Coordinates, thunkAPI) {
        try {
            const response = await WeatherService.getCurrentHourlyWeather(
                payload.lat,
                payload.lon
            );
            const weatherData = response.data;

            return weatherData;
        } catch (e) {
            return thunkAPI.rejectWithValue('Server error');
        }
    }
);

export default fetchCurrentHourlyWeather;
