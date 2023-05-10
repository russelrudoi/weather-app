import { FC } from 'react';
import { IWeather } from '../../models/IWeather';
import { converTimeZone } from '../../services/convertTimeService';
import { Box, Grid, Typography } from '@mui/material';
import { boxStyle } from '../../styles/theme-style';

interface PropsWeather {
    weather: IWeather;
}

const WeatherBlockMini: FC<PropsWeather> = ({ weather }) => {
    return (
        <Box p='15px' sx={{ ...boxStyle, width: 280, height: 230 }}>
            <Grid container alignItems='center'>
                <Grid item justifySelf='center'>
                    <Box
                        component='img'
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt='name'
                        sx={{ width: 'auto' }}
                    />
                    <Typography
                        component='div'
                        lineHeight='0px'
                        textAlign='center'
                    >
                        {weather.weather[0].description.replace(/^\w/, c =>
                            c.toUpperCase()
                        )}
                    </Typography>
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
                </Grid>
            </Grid>
            <Typography variant='h5' component='div' mt='25px'>
                <Typography variant='h5' component='span' sx={{ opacity: 0.8 }}>
                    City:
                </Typography>{' '}
                {weather.name}, {weather.sys.country}
            </Typography>
            <Typography variant='h5' component='div'>
                <Typography variant='h5' component='span' sx={{ opacity: 0.8 }}>
                    Local time:
                </Typography>{' '}
                {converTimeZone(weather.timezone, 'time')},{' '}
                {converTimeZone(weather.timezone, 'date')}
            </Typography>
        </Box>
    );
};

export default WeatherBlockMini;
