import { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import fetchCurrentWeather from '../../store/thunks/fetchCurrentWeather/fetchCurrentWeather';
import { getAllFromLocalStorage } from '../../services/localStorageService';
import { Container } from '@mui/material';
import MainPage from '../../pages/MainPage';
import SingleWeatherPage from '../../pages/SingleWeatherPage';

const App = () => {
    const dispatch = useAppDispatch();

    const fetchAllWeather = useCallback(
        (arr: string[]) => {
            arr.forEach(id => {
                dispatch(fetchCurrentWeather(id));
            });
        },
        [dispatch]
    );

    useEffect(() => {
        fetchAllWeather(getAllFromLocalStorage());
    }, [fetchAllWeather]);

    return (
        <Container>
            <Routes>
                <Route
                    path='/'
                    data-testid='main-page-link'
                    element={<MainPage />}
                />
                <Route path=':id' element={<SingleWeatherPage />} />
            </Routes>
        </Container>
    );
};

export default App;
