import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IWeather } from '../../models/IWeather';
import { useAppDispatch } from '../../hooks/redux';
import updateCurrentWeather from '../../store/thunks/updateCurrentWeather/updateCurrentWeather';
import { getCurrentDate } from '../../services/convertTimeService/convertTimeService';
import { removeWeatherItem } from '../../store/slice/currentWeatherSlice/currentWeatherSlice';
import { LoadingButton } from '@mui/lab';
import { Grid, Card, CardMedia, Typography, IconButton } from '@mui/material';
import { Clear, MoreHoriz, Update, WaterDrop, Air } from '@mui/icons-material';
import { boxStyle, buttonStyle } from '../../styles/theme-style';

import './style.scss';

interface PropsWeather {
    weather: IWeather;
}

const CardItem: FC<PropsWeather> = ({ weather }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const handlerUpdateWeather = (id: number) => {
        setLoading(true);
        dispatch(updateCurrentWeather(id.toString()));
    };

    const handlerRemoveCard = (id: number) => {
        dispatch(removeWeatherItem(id));
    };

    useEffect(() => {
        setLoading(false);
    }, [weather]);

    return (
        <Grid item data-testid={'main-page'}>
            <Card
                sx={{
                    ...boxStyle,
                    position: 'relative',
                    height: 350,
                    width: 280,
                    padding: '15px 10px 10px'
                }}
            >
                <Typography variant='h6' component='div' sx={{ lineHeight: 1 }}>
                    {weather.name}
                    <br />
                    <Typography variant='subtitle2' component='div'>
                        {weather.sys.country}
                    </Typography>
                </Typography>
                <Grid container alignItems={'center'}>
                    <Grid item>
                        <CardMedia
                            component='img'
                            image={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt='name'
                            sx={{ width: 'auto' }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant='h3'
                            component='div'
                            sx={{
                                color: '#EC6E4C',
                                letterSpacing: '-4px'
                            }}
                        >
                            {Math.floor(weather.main.temp)}
                            <Typography variant='h3' component='span'>
                                °c
                            </Typography>
                        </Typography>
                        <Typography sx={{ opacity: 0.5 }} component='div'>
                            Feels like {Math.floor(weather.main.feels_like)}°c
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant='h5' component='div'>
                    {weather.weather[0].main}
                </Typography>
                <hr />
                <Grid container justifyContent='space-around'>
                    <Grid item>
                        <Typography
                            variant='body1'
                            component='div'
                            sx={{ display: 'flex', columnGap: 1 }}
                        >
                            <Air />
                            {weather.wind.speed} m/s
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant='body1'
                            component='div'
                            sx={{ display: 'flex', columnGap: 1 }}
                        >
                            <WaterDrop />
                            {weather.main.humidity}%
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent='space-around' mt='25px'>
                    <Grid item>
                        <IconButton
                            onClick={() => handlerRemoveCard(weather.id)}
                            className='icon-delete'
                            color='error'
                            sx={{
                                ...buttonStyle,
                                border: '1px solid rgba(211, 47, 47, 0.5)'
                            }}
                        >
                            <Clear />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            onClick={() => handlerUpdateWeather(weather.id)}
                            loading={loading}
                            variant='outlined'
                            sx={buttonStyle}
                        >
                            <Update />
                        </LoadingButton>
                    </Grid>
                    <Grid item>
                        <Link
                            to={`${weather.id}`}
                            data-testid='single-page-link'
                        >
                            <IconButton
                                color='success'
                                sx={{
                                    ...buttonStyle,
                                    border: '1px solid rgba(46, 125, 50, 0.5)'
                                }}
                            >
                                <MoreHoriz />
                            </IconButton>
                        </Link>
                    </Grid>
                </Grid>
                <Typography
                    variant='caption'
                    component='div'
                    sx={{ position: 'absolute', bottom: '5px', opacity: '0.5' }}
                >
                    Last update: {getCurrentDate(weather.lastUpdateTime)}
                </Typography>
            </Card>
        </Grid>
    );
};

export default CardItem;
