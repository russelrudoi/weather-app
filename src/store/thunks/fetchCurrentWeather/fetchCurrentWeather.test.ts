import { AppStore, rootReducer } from '../../store';
import fetchCurrentWeather from './fetchCurrentWeather';
import { WeatherService } from '../../../services/WeatherService';
import { IWeather } from '../../../models/IWeather';
import { AxiosResponse } from 'axios';
import { configureStore } from '@reduxjs/toolkit';

describe('fetch current weather', () => {
    const payload = '3099434';
    let mockStore: AppStore;

    beforeEach(() => {
        jest.restoreAllMocks();
        mockStore = configureStore({
            reducer: rootReducer
        });
    });

    it('should fetch current weather with resolve response', async () => {
        const mockWeather: IWeather = {
            coord: { lon: 18.6464, lat: 54.3521 },
            weather: [
                {
                    main: 'Clear',
                    description: 'clear sky',
                    icon: '01d'
                }
            ],
            main: {
                temp: 18.84,
                feels_like: 17.48,
                temp_min: 18.13,
                temp_max: 18.84,
                pressure: 1018,
                humidity: 27
            },
            visibility: 10000,
            wind: {
                speed: 8.75
            },
            sys: {
                country: 'PL',
                sunrise: 1683687038,
                sunset: 1683743584
            },
            timezone: 7200,
            id: 3099434,
            name: 'Gdańsk',
            lastUpdateTime: '2023-05-10T16:07:21.196Z',
            isUpdate: false
        };

        const mockWeatherResponse = {
            data: mockWeather,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as AxiosResponse<IWeather>;

        const getWeatherSpy = jest
            .spyOn(WeatherService, 'getCurrentWeatherById')
            .mockResolvedValue(mockWeatherResponse);

        await mockStore.dispatch(fetchCurrentWeather(payload));

        expect(getWeatherSpy).toBeCalledWith(payload);
        const arrWeather = mockStore.getState().currentWeatherReducer.weather;

        expect(arrWeather).toEqual([mockWeather]);
    });

    it('should fetch current weather data rejected response', async () => {
        const getWeatherSpy = jest
            .spyOn(WeatherService, 'getCurrentWeatherById')
            .mockRejectedValue(new Error('Server error'));

        await mockStore.dispatch(fetchCurrentWeather(payload));
        expect(getWeatherSpy).toBeCalledWith(payload);
        const error = mockStore.getState().currentWeatherReducer.errorWeather;

        expect(error).toEqual('Server error');
    });
});
