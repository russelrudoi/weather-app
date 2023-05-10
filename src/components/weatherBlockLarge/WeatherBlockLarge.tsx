import { FC } from 'react';
import { IWeather } from '../../models/IWeather';
import { Box, Grid, Typography } from '@mui/material';
import {
    Air,
    DeviceThermostat,
    ThermostatAuto,
    Visibility,
    WaterDrop,
    WbTwilight
} from '@mui/icons-material';
import { boxStyle } from '../../styles/theme-style';

interface PropsWeather {
    weather: IWeather;
}

const WeatherBlockLarge: FC<PropsWeather> = ({ weather }) => {
    const meterToKilometer = (meter: number): string => {
        if (meter < 500) {
            return meter + ' m';
        } else {
            return meter / 1000 + ' km';
        }
    };

    const convertTime = (unixTime: number): string => {
        const time = new Date(unixTime * 1000);
        return `${time.getHours()}:${time.getMinutes()}`;
    };

    return (
        <Box p='15px 25px' sx={{ ...boxStyle, width: 847, height: 230 }}>
            <Grid container spacing={4}>
                <Grid item sx={{ opacity: 0.5, lineHeight: '40px' }}>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <DeviceThermostat />
                        Temperature
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <DeviceThermostat sx={{ color: 'blue' }} />
                        Min. temp
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <DeviceThermostat sx={{ color: 'red' }} />
                        Max. temp
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <WaterDrop />
                        Humidity
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <Visibility />
                        Visibility
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {Math.floor(weather.main.temp)}° - feels like{' '}
                        {Math.floor(weather.main.feels_like)}°
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {Math.floor(weather.main.temp_min)}°
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {Math.floor(weather.main.temp_max)}°
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {weather.main.humidity}%
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {meterToKilometer(weather.visibility)}
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{ width: '170px', opacity: 0.5, lineHeight: '40px' }}
                >
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <ThermostatAuto />
                        Pressure
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <Air />
                        Wind speed
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <WbTwilight sx={{ color: '#dae014' }} />
                        Sunrise
                    </Typography>
                    <Typography
                        variant='h5'
                        component='div'
                        lineHeight='40px'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: 0.5
                        }}
                    >
                        <WbTwilight sx={{ color: 'orange' }} />
                        Sunset
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {weather.main.pressure} mm
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {weather.wind.speed} m/s
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {convertTime(weather.sys.sunrise)}
                    </Typography>
                    <Typography variant='h5' component='div' lineHeight='40px'>
                        {convertTime(weather.sys.sunset)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WeatherBlockLarge;
