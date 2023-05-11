import { AppStore, rootReducer } from '../../store';
import { WeatherService } from '../../../services/WeatherService';
import { IWeather } from '../../../models/IWeather';
import fetchCurrentWeather from '../fetchCurrentWeather/fetchCurrentWeather';
import configureStore from 'redux-mock-store';

import currentWeatherSlice, {
    CurrentWeather
} from '../../slice/currentWeatherSlice/currentWeatherSlice';
import updateCurrentWeather from './updateCurrentWeather';
import { AxiosResponse } from 'axios';
import { AnyAction, ThunkDispatch, ThunkMiddleware } from '@reduxjs/toolkit';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// describe('update current weather', () => {
//     let mockStore: AppStore;
//     let mockWeather: IWeather;
//     let mockWeatherResponse: AxiosResponse<IWeather>;
//     const payload = '3099434';
//     let state;
//     beforeEach(() => {
//         jest.clearAllMocks();

//         mockStore = configureStore({
//             reducer: rootReducer
//         });

//         mockWeather = {
//             weather: [
//                 {
//                     main: 'Clear',
//                     description: 'clear sky',
//                     icon: '01d'
//                 }
//             ],
//             main: {
//                 temp: 18.84,
//                 feels_like: 17.48,
//                 temp_min: 18.13,
//                 temp_max: 18.84,
//                 pressure: 1018,
//                 humidity: 27
//             },
//             visibility: 10000,
//             wind: {
//                 speed: 8.75
//             },
//             sys: {
//                 country: 'PL',
//                 sunrise: 1683687038,
//                 sunset: 1683743584
//             },
//             timezone: 7200,
//             id: 3099434,
//             name: 'Gdańsk',
//             lastUpdateTime: '2023-05-10T16:07:21.196Z',
//             isUpdate: false
//         };

//         mockWeatherResponse = {
//             data: mockWeather,
//             status: 200,
//             statusText: 'OK',
//             headers: {},
//             config: {}
//         } as AxiosResponse<IWeather>;
//     });

//     it('should update weather', async () => {
//         const thunk = updateCurrentWeather('paris');
//         const dispatch = jest.fn();
//         await thunk(dispatch, () => ({}), mockWeatherResponse);
//         console.log(dispatch.mock.calls);
//         const state = store.getState().currentWeatherReducer;
//         jest.spyOn(WeatherService, 'getCurrentWeatherById').mockResolvedValue(
//             mockWeatherResponse
//         );

//         await mockStore.dispatch(fetchCurrentWeather(payload));

//         const weatherIsUpdate = mockStore.getState().currentWeatherReducer;

//         expect(weatherIsUpdate).toBe(true);
//     });
//     it('should update weather2', async () => {
//         const state = store.getState().currentWeatherReducer;
//         jest.spyOn(WeatherService, 'getCurrentWeatherById').mockResolvedValue(
//             mockWeatherResponse
//         );

//         await mockStore.dispatch(updateCurrentWeather(payload));

//         const weatherIsUpdate = mockStore.getState().currentWeatherReducer;

//         expect(weatherIsUpdate).toBe(true);
//     });

// it('should not update weather', async () => {
//     // const getWeatherSpy = jest
//     //     .spyOn(WeatherService, 'getCurrentWeatherById')
//     //     .mockResolvedValue(mockWeatherResponse);

//     jest.spyOn(WeatherService, 'getCurrentWeatherById').mockResolvedValue(
//         mockWeatherResponse
//     );

//     await mockStore.dispatch(fetchCurrentWeather(payload));
//     const isUpdate =
//         mockStore.getState().currentWeatherReducer.weather[0].isUpdate;

//     expect(isUpdate).toBeFalsy();

//     const getWeatherSpyRejected = jest
//         .spyOn(WeatherService, 'getCurrentWeatherById')
//         .mockRejectedValue(new Error('2'));

//     await mockStore.dispatch(updateCurrentWeather(payload));
//     expect(getWeatherSpyRejected).toBeCalledWith(payload);
//     const error = mockStore.getState().currentWeatherReducer;

//     expect(error).toEqual('Server error');
// });
// });

// describe('update current weather', () => {
//     // let mockStore: AppStore;

//     beforeEach(() => {
//         // mockStore = configureStore({
//         //     reducer: rootReducer
//         // });
//     });
//     it('upd', async () => {
//         const mockWeather: IWeather = {
//             weather: [
//                 {
//                     main: 'Clear',
//                     description: 'clear sky',
//                     icon: '01d'
//                 }
//             ],
//             main: {
//                 temp: 18.84,
//                 feels_like: 17.48,
//                 temp_min: 18.13,
//                 temp_max: 18.84,
//                 pressure: 1018,
//                 humidity: 27
//             },
//             visibility: 10000,
//             wind: {
//                 speed: 8.75
//             },
//             sys: {
//                 country: 'PL',
//                 sunrise: 1683687038,
//                 sunset: 1683743584
//             },
//             timezone: 7200,
//             id: 3099434,
//             name: 'Gdańsk',
//             lastUpdateTime: '2023-05-10T16:07:21.196Z',
//             isUpdate: false
//         };

//         const mockWeatherResponse = {
//             data: mockWeather,
//             status: 200,
//             statusText: 'OK',
//             headers: {},
//             config: {}
//         } as AxiosResponse<IWeather>;

//         const initialState: CurrentWeather = {
//             weather: [],
//             isLoadingNewWeather: false,
//             isLoadingWeather: false,
//             errorWeather: null
//         };

//         const state = currentWeatherSlice(
//             initialState,
//             fetchCurrentWeather.fulfilled(mockWeather, '', '')
//         );

//         expect(state).toEqual({
//             weather: [mockWeather],
//             isLoadingNewWeather: false,
//             isLoadingWeather: false,
//             errorWeather: null
//         });

//         jest.spyOn(WeatherService, 'getCurrentWeatherById').mockResolvedValue(
//             mockWeatherResponse
//         );

//         await store.dispatch(updateCurrentWeather('3099434'));

//         const weatherIsUpdate = state.weather;

//         expect(weatherIsUpdate).toBe(true);
//     });
// });
// type DispatchExts = ThunkDispatch<CurrentWeather, undefined, AnyAction>;
// const mockStore = createMockStore<CurrentWeather, DispatchExts>([thunk]);

// describe('update current weather', () => {
//     // let mockStore: AppStore;
//     let store: AppStore;
//     beforeEach(() => {
//         // mockStore = configureStore({
//         //     reducer: rootReducer
//         // });
//     });
//     it('upd', async () => {
//         const mockWeather: IWeather = {
//             weather: [
//                 {
//                     main: 'Clear',
//                     description: 'clear sky',
//                     icon: '01d'
//                 }
//             ],
//             main: {
//                 temp: 18.84,
//                 feels_like: 17.48,
//                 temp_min: 18.13,
//                 temp_max: 18.84,
//                 pressure: 1018,
//                 humidity: 27
//             },
//             visibility: 10000,
//             wind: {
//                 speed: 8.75
//             },
//             sys: {
//                 country: 'PL',
//                 sunrise: 1683687038,
//                 sunset: 1683743584
//             },
//             timezone: 7200,
//             id: 3099434,
//             name: 'Gdańsk',
//             lastUpdateTime: '2023-05-10T16:07:21.196Z',
//             isUpdate: false
//         };

//         const mockWeatherResponse = {
//             data: mockWeather,
//             status: 200,
//             statusText: 'OK',
//             headers: {},
//             config: {}
//         } as AxiosResponse<IWeather>;

//         const initialState: CurrentWeather = {
//             weather: [],
//             isLoadingNewWeather: false,
//             isLoadingWeather: false,
//             errorWeather: null
//         };
//         const store = mockStore({
//             weather: [mockWeather],
//             isLoadingNewWeather: false,
//             isLoadingWeather: false,
//             errorWeather: null
//         });

//         const weatherIsUpdate2 = store.getState();

//         expect(weatherIsUpdate2).toBe(2);

//         jest.spyOn(WeatherService, 'getCurrentWeatherById').mockResolvedValue(
//             mockWeatherResponse
//         );

//         await store.dispatch(updateCurrentWeather('3099434'));

//         const weatherIsUpdate = store.getState();

//         expect(weatherIsUpdate).toBe(4);

// const state = currentWeatherSlice(
//     initialState,

// );

// expect(3).toEqual({
//     weather: [mockWeather],
//     isLoadingNewWeather: false,
//     isLoadingWeather: false,
//     errorWeather: null
// });

// jest.spyOn(WeatherService, 'getCurrentWeatherById').mockResolvedValue(
//     mockWeatherResponse
// );

// await store.dispatch(updateCurrentWeather('3099434'));

// const weatherIsUpdate = state.weather;

// expect(weatherIsUpdate).toBe(true);
// S
