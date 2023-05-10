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
import React, { FC } from 'react';
import { boxStyle } from '../../styles/theme-style';

const HourlyWeatherBlock: FC = () => {
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number
    ) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9)
    ];

    const hours = [
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
    ];

    return (
        <Box>
            <TableContainer sx={{ ...boxStyle, width: 1152, height: 200 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {hours.map(i => (
                                <TableCell align='right'>{i}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ height: 150 }}>
                        <TableRow>
                            {hours.map(i => (
                                <TableCell align='center' padding='none'>
                                    <Typography
                                        component={'div'}
                                        sx={{
                                            borderBottom: '2px solid orange',
                                            backgroundColor: 'yellow'
                                        }}
                                    >
                                        +18
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default HourlyWeatherBlock;
