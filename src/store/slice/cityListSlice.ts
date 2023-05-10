import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCityListWeather } from '../thunks/fetchCityListWeather';
import { ICity } from '../../models/ICity';

interface CityList {
    cities: ICity[];
    isLoadingCity: boolean;
    errorCity: string | null;
}

const initialState: CityList = {
    cities: [],
    isLoadingCity: false,
    errorCity: null
};

const cityListSlice = createSlice({
    name: 'cityList',
    initialState,
    reducers: {
        clearList: state => {
            state.cities = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCityListWeather.pending, state => {
                state.isLoadingCity = true;
                state.errorCity = null;
            })
            .addCase(fetchCityListWeather.fulfilled, (state, action) => {
                state.isLoadingCity = false;

                if (action.payload.length) {
                    state.cities = action.payload;
                } else {
                    state.errorCity = 'City is not found';
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoadingCity = false;
                state.errorCity = action.payload;
            });
    }
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const { clearList } = cityListSlice.actions;

export default cityListSlice.reducer;
