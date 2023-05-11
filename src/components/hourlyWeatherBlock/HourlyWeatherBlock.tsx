import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { FC, useEffect } from 'react';
import { boxStyle } from '../../styles/theme-style';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import fetchCurrentHourlyWeather, {
    Coordinates
} from '../../store/thunks/fetchCurrentHourlyWeather/fetchCurrentHourlyWeather';
import getTemperatureColorUtility from '../../utils/getTemperatureColorUtility/getTemperatureColorUtility';

const HourlyWeatherBlock: FC<Coordinates> = ({ lat, lon }) => {
    const dispatch = useAppDispatch();
    const { hourlyWeather } = useAppSelector(
        state => state.currentHourlyWeatherReducer
    );

    const localTime = new Date(
        new Date().getTime() + hourlyWeather.timezone_offset * 1000
    );

    useEffect(() => {
        dispatch(fetchCurrentHourlyWeather({ lat, lon }));
    }, [dispatch, lat, lon]);

    return (
        <Box>
            <TableContainer
                sx={{
                    ...boxStyle,
                    width: 1152,
                    height: 250,
                    overflowY: 'hidden'
                }}
            >
                <Table
                    sx={{ minWidth: 650, height: '100%' }}
                    aria-label='simple table'
                >
                    <TableHead>{timeBlocks(localTime.getUTCHours())}</TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ position: 'relative', overflow: 'hidden' }}
                        >
                            {
                                // eslint-disable-next-line array-callback-return
                                hourlyWeather.hourly.map((i, index) => {
                                    while (
                                        index <=
                                        24 - localTime.getUTCHours()
                                    ) {
                                        return (
                                            <TableCell
                                                align='center'
                                                padding='none'
                                                sx={{
                                                    height: '100%',
                                                    position: 'relative',
                                                    bottom:
                                                        Math.round(i.temp) * 3,
                                                    borderLeft: '1px solid gray'
                                                }}
                                                key={index}
                                            >
                                                <Typography
                                                    component={'div'}
                                                    sx={{
                                                        borderBottom: `2px solid ${getTemperatureColorUtility(
                                                            Math.floor(i.temp),
                                                            'border'
                                                        )}`,
                                                        backgroundColor: `rgb(${getTemperatureColorUtility(
                                                            Math.floor(i.temp)
                                                        )})`
                                                    }}
                                                >
                                                    {i.temp > 0
                                                        ? `+${Math.round(
                                                              i.temp
                                                          )}°`
                                                        : null}
                                                    {i.temp < 0
                                                        ? `-${Math.round(
                                                              i.temp
                                                          )}°`
                                                        : null}
                                                </Typography>
                                            </TableCell>
                                        );
                                    }
                                })
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const timeBlocks = (startTime: number) => {
    const renderTimeBlocks = () => {
        const blocks = [];

        for (let hour = startTime; hour <= 24; hour++) {
            const formattedHour = hour.toString().padStart(2, '0');
            const time = `${formattedHour}:00`;

            blocks.push(
                <TableCell key={time} align='right'>
                    {time}
                </TableCell>
            );
        }

        return blocks;
    };

    return <TableRow>{renderTimeBlocks()}</TableRow>;
};

export default HourlyWeatherBlock;
