import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from './slice/currentWeatherSlice';
import cityListReducer from './slice/cityListSlice';

const rootReducer = combineReducers({
    currentWeatherReducer,
    cityListReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
