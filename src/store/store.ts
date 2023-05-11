import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from './slice/currentWeatherSlice/currentWeatherSlice';
import cityListReducer from './slice/cityListSlice/cityListSlice';

export const rootReducer = combineReducers({
    currentWeatherReducer,
    cityListReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export const store = createStore();

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
