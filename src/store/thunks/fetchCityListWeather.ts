import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherService } from '../../services/WeatherService';
import { ICity } from '../../models/ICity';

export const fetchCityListWeather = createAsyncThunk<
    ICity[],
    string,
    { rejectValue: string }
>('cityList/fetchCityListWeather', async function (payload: string, thunkAPI) {
    try {
        const response = await WeatherService.getListCityByName(payload);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('Server error');
    }
});
