import { ICity } from '../../../models/ICity';
import { fetchCityListWeather } from '../../thunks/fetchCityListWeather/fetchCityListWeather';
import cityListSlice, { CityList, clearList } from './cityListSlice';

describe('cityListSlice', () => {
    let initialState: CityList;
    const mockCities: ICity[] = [
        {
            name: 'Lviv',
            lat: 49.841952,
            lon: 24.0315921,
            country: 'UA',
            state: 'Lviv Oblast'
        }
    ];
    beforeEach(() => {
        initialState = {
            cities: [],
            isLoadingCity: false,
            errorCity: null
        };
    });

    it('should change status with "fetchCityListWeather.pending" action', () => {
        const state = cityListSlice(
            initialState,
            fetchCityListWeather.pending('', '')
        );
        expect(state.isLoadingCity).toBe(true);
        expect(state.errorCity).toBeNull();
    });

    it('should fetch list with "fetchCityListWeather.fulfilled" action', () => {
        const state = cityListSlice(
            initialState,
            fetchCityListWeather.fulfilled(mockCities, '', '')
        );
        expect(state).toEqual({
            cities: mockCities,
            isLoadingCity: false,
            errorCity: null
        });
    });

    it('should change status and error with "fetchCityListWeather.rejected" action', () => {
        const action = {
            type: fetchCityListWeather.rejected.type,
            payload: 'Error fetch'
        };
        const state = cityListSlice(initialState, action);

        expect(state).toEqual({
            cities: [],
            isLoadingCity: false,
            errorCity: 'Error fetch'
        });
    });

    it('should clear store cities', () => {
        initialState.cities = mockCities;

        const state = cityListSlice(initialState, clearList());

        expect(state).toEqual({
            cities: [],
            isLoadingCity: false,
            errorCity: null
        });
    });
});
