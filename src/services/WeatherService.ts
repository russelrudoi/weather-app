import { AxiosResponse } from 'axios';
import { IWeather } from '../models/IWeather';
import { api, apiCityList } from '../axios';
import { ICity } from '../models/ICity';

export class WeatherService {
    static getCurrentWeatherByName(
        city: string
    ): Promise<AxiosResponse<IWeather>> {
        return api.get<IWeather>(`/weather?q=${city}`);
    }

    static getCurrentWeatherById(id: string): Promise<AxiosResponse<IWeather>> {
        return api.get<IWeather>(`/weather?id=${id}`);
    }

    static getCurrentWeatherByCoordinates(
        lat: string,
        lon: string
    ): Promise<AxiosResponse<IWeather>> {
        return api.get<IWeather>(`/weather?lat=${lat}&lon=${lon}`);
    }

    static getListCityByName(name: string): Promise<AxiosResponse<ICity[]>> {
        return apiCityList.get<ICity[]>(`/direct?q=${name}&limit=5`);
    }
}
