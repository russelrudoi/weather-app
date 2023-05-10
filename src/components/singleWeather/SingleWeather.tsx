import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IWeather } from '../../models/IWeather';
import updateCurrentWeather from '../../store/thunks/updateCurrentWeather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import WeatherBlockMini from '../weatherBlockMini/WeatherBlockMini';
import WeatherBlockLarge from '../weatherBlockLarge/WeatherBlockLarge';
import HourlyWeatherBlock from '../hourlyWeatherBlock/HourlyWeatherBlock';
import ButtonBlock from '../buttonBlock/ButtonBlock';

const SingleWeather: FC = () => {
    const dispatch = useAppDispatch();
    const { weather, isLoadingWeather, errorWeather } = useAppSelector(
        state => state.currentWeatherReducer
    );
    const { pathname } = useLocation();

    const weatherId = pathname.slice(1);
    const weatherItem: IWeather | undefined = weather.find(
        item => item.id === +weatherId
    );

    useEffect(() => {
        if (!weatherItem) {
            dispatch(updateCurrentWeather(weatherId));
        }
    }, [weatherItem, weatherId, dispatch]);

    const handlerUpdateWeather = () => {
        dispatch(updateCurrentWeather(weatherId));
    };

    return (
        <Grid container justifyContent='space-between' rowGap={5}>
            <Grid item>
                {isLoadingWeather && (
                    <Skeleton variant='rounded' width={280} height={230} />
                )}
                {errorWeather && (
                    <Skeleton variant='rounded' width={280} height={230}>
                        Weather data not available
                    </Skeleton>
                )}
                {weatherItem ? (
                    <WeatherBlockMini weather={weatherItem} />
                ) : null}
            </Grid>
            <Grid item>
                {isLoadingWeather && (
                    <Skeleton variant='rounded' width={847} height={230} />
                )}
                {errorWeather && (
                    <Skeleton variant='rounded' width={847} height={230}>
                        Weather data not available
                    </Skeleton>
                )}
                {weatherItem ? (
                    <WeatherBlockLarge weather={weatherItem} />
                ) : null}
            </Grid>
            <HourlyWeatherBlock />
            <ButtonBlock
                isLoading={weatherItem?.isUpdate}
                handlerUpdate={handlerUpdateWeather}
            />
        </Grid>
    );
};

export default SingleWeather;
