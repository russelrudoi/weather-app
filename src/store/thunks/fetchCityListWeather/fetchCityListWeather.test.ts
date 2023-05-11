import { AppStore, rootReducer } from '../../store';
import { WeatherService } from '../../../services/WeatherService';
import { AxiosResponse } from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { ICity } from '../../../models/ICity';
import { fetchCityListWeather } from './fetchCityListWeather';

describe('fetch city list', () => {
    const payload = 'Lviv';
    let mockStore: AppStore;

    beforeEach(() => {
        jest.restoreAllMocks();
        mockStore = configureStore({
            reducer: rootReducer
        });
    });

    it('should fetch city list with resolve response', async () => {
        const mockCities: ICity[] = [
            {
                name: 'Lviv',
                lat: 49.841952,
                lon: 24.0315921,
                country: 'UA',
                state: 'Lviv Oblast'
            }
        ];

        const mockCityResponse = {
            data: mockCities,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<ICity[]>;

        const getCityListSpy = jest
            .spyOn(WeatherService, 'getListCityByName')
            .mockResolvedValue(mockCityResponse);

        await mockStore.dispatch(fetchCityListWeather(payload));

        expect(getCityListSpy).toBeCalledWith(payload);
        const cityList = mockStore.getState().cityListReducer.cities;

        expect(cityList).toEqual(mockCities);
    });

    it('should fetch city list with rejected response', async () => {
        const getWeatherSpy = jest
            .spyOn(WeatherService, 'getListCityByName')
            .mockRejectedValue(new Error('Server error'));

        await mockStore.dispatch(fetchCityListWeather(payload));
        expect(getWeatherSpy).toBeCalledWith(payload);

        const error = mockStore.getState().cityListReducer.errorCity;

        expect(error).toEqual('Server error');
    });
});
