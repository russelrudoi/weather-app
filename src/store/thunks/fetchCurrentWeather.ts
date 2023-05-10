import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherService } from '../../services/WeatherService';
import { IWeather } from '../../models/IWeather';

const fetchCurrentWeather = createAsyncThunk<
    IWeather,
    string,
    { rejectValue: string }
>(
    'currentWeather/fetchCurrentWeather',
    async function (payload: string, thunkAPI) {
        try {
            const response = await WeatherService.getCurrentWeatherById(
                payload
            );
            const weatherData = response.data;

            weatherData.lastUpdateTime = new Date().toISOString();

            return weatherData;
        } catch (e) {
            return thunkAPI.rejectWithValue('Server error');
        }
    }
);

export default fetchCurrentWeather;
