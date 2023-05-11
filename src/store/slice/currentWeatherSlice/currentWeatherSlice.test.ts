import { IWeather } from '../../../models/IWeather';
import addCurrentWeather from '../../thunks/addCurrentWeather/addCurrentWeather';
import fetchCurrentWeather from '../../thunks/fetchCurrentWeather/fetchCurrentWeather';
import updateCurrentWeather from '../../thunks/updateCurrentWeather/updateCurrentWeather';
import currentWeatherSlice, {
    CurrentWeather,
    removeWeatherItem
} from './currentWeatherSlice';

describe('currentWeatherSlice', () => {
    let mockWeather: IWeather;
    let initialState: CurrentWeather;

    beforeEach(() => {
        mockWeather = {
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

        initialState = {
            weather: [],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: null
        };
    });

    it('should change status with "fetchCurrentWeather.pending" action', () => {
        const state = currentWeatherSlice(
            initialState,
            fetchCurrentWeather.pending('', '')
        );
        expect(state.isLoadingWeather).toBe(true);
        expect(state.errorWeather).toBeNull();
    });

    it('should fetch list with "fetchCurrentWeather.fulfilled" action', () => {
        const state = currentWeatherSlice(
            initialState,
            fetchCurrentWeather.fulfilled(mockWeather, '', '')
        );
        expect(state).toEqual({
            weather: [mockWeather],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: null
        });
    });

    it('should change status and error with "fetchCurrentWeather.rejected" action', () => {
        const action = {
            type: fetchCurrentWeather.rejected.type,
            payload: 'Error fetch'
        };
        const state = currentWeatherSlice(initialState, action);

        expect(state).toEqual({
            weather: [],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: 'Error fetch'
        });
    });

    it('should change status with "updateCurrentWeather.pending" action', () => {
        const state = currentWeatherSlice(
            initialState,
            updateCurrentWeather.pending('', '')
        );
        expect(state.isLoadingWeather).toBe(true);
        expect(state.errorWeather).toBeNull();
    });

    it('should update list with "updateCurrentWeather.fulfilled" action', () => {
        initialState.weather = [mockWeather];

        const state = currentWeatherSlice(
            initialState,
            updateCurrentWeather.fulfilled(mockWeather, '', '')
        );
        expect(state.weather[0].isUpdate).toBeTruthy();
    });

    it('should not update weather with different id', () => {
        initialState.weather = [mockWeather];

        const mockWeatherOther: IWeather = JSON.parse(
            JSON.stringify(mockWeather)
        );
        mockWeatherOther.id = 3000555;

        const state = currentWeatherSlice(
            initialState,
            updateCurrentWeather.fulfilled(mockWeatherOther, '', '')
        );
        expect(state.weather[0].isUpdate).toBeFalsy();
    });

    it('should change status and error with "updateCurrentWeather.rejected" action', () => {
        initialState.weather = [mockWeather];

        const action = {
            type: updateCurrentWeather.rejected.type,
            payload: 'Error fetch'
        };
        const state = currentWeatherSlice(initialState, action);

        expect(state.weather[0].isUpdate).toBeFalsy();

        expect(state).toEqual({
            weather: [mockWeather],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: 'Error fetch'
        });
    });

    it('should change status with "addCurrentWeather.pending" action', () => {
        const state = currentWeatherSlice(
            initialState,
            addCurrentWeather.pending('', '')
        );
        expect(state.isLoadingNewWeather).toBe(true);
        expect(state.errorWeather).toBeNull();
    });

    it('should add new weather with "addCurrentWeather.fulfilled" action', () => {
        initialState.weather = [mockWeather];

        const mockWeatherOther: IWeather = JSON.parse(
            JSON.stringify(mockWeather)
        );
        mockWeatherOther.id = 3000555;

        const state = currentWeatherSlice(
            initialState,
            addCurrentWeather.fulfilled(mockWeatherOther, '', '')
        );

        expect(state).toEqual({
            weather: [mockWeather, mockWeatherOther],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: null
        });
    });

    it('should not add new weather with the same id', () => {
        initialState.weather = [mockWeather];

        const mockWeatherOther: IWeather = JSON.parse(
            JSON.stringify(mockWeather)
        );

        const state = currentWeatherSlice(
            initialState,
            addCurrentWeather.fulfilled(mockWeatherOther, '', '')
        );

        expect(state).toEqual({
            weather: [mockWeather],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: 'The city already exists'
        });
    });

    it('should change status and error with "addCurrentWeather.rejected" action', () => {
        const action = {
            type: addCurrentWeather.rejected.type,
            payload: 'Error fetch'
        };
        const state = currentWeatherSlice(initialState, action);

        expect(state).toEqual({
            weather: [],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: 'Error fetch'
        });
    });

    it('should remove weather item from store weather', () => {
        initialState.weather = [mockWeather];

        const state = currentWeatherSlice(
            initialState,
            removeWeatherItem(3099434)
        );
        expect(state).toEqual({
            weather: [],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: null
        });
    });

    it('should not remove weather item with different id', () => {
        initialState.weather = [mockWeather];

        const state = currentWeatherSlice(
            initialState,
            removeWeatherItem(3000222)
        );
        expect(state).toEqual({
            weather: [mockWeather],
            isLoadingNewWeather: false,
            isLoadingWeather: false,
            errorWeather: null
        });
    });
});
