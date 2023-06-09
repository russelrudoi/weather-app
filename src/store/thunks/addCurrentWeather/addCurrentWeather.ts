import { createAsyncThunk } from '@reduxjs/toolkit';
import { IWeather } from '../../../models/IWeather';
import { WeatherService } from '../../../services/WeatherService';

const addCurrentWeather = createAsyncThunk<
    IWeather,
    string,
    { rejectValue: string }
>(
    'currentWeather/addCurrentWeather',
    async function (payload: string, thunkAPI) {
        try {
            const response = await WeatherService.getCurrentWeatherByName(
                payload
            );
            const weatherData = response.data;

            weatherData.lastUpdateTime = new Date().toISOString();

            return weatherData;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                'Server error or this city weather is not available'
            );
        }
    }
);

export default addCurrentWeather;
