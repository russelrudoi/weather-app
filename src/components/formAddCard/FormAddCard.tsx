import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCityListWeather } from '../../store/thunks/fetchCityListWeather/fetchCityListWeather';
import { ICity } from '../../models/ICity';
import addCurrentWeather from '../../store/thunks/addCurrentWeather/addCurrentWeather';
import { clearList } from '../../store/slice/cityListSlice/cityListSlice';
import { boxStyle, buttonStyle } from '../../styles/theme-style';
import {
    Card,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type FormData = {
    cityName: string;
};

const FormAddCard: FC = () => {
    const dispatch = useAppDispatch();
    const { cities, errorCity, isLoadingCity } = useAppSelector(
        state => state.cityListReducer
    );
    const { errorWeather } = useAppSelector(
        state => state.currentWeatherReducer
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<FormData>({});

    const onGetListCity = handleSubmit(data => {
        dispatch(fetchCityListWeather(data.cityName));
    });

    const onSubmitCity = (name: string) => {
        dispatch(addCurrentWeather(name));
        dispatch(clearList());
        reset();
    };

    const filterDublicateCity = (cities: ICity[]): ICity[] => {
        const filteredArray = cities.filter(
            (obj, index, self) =>
                index ===
                self.findIndex(o => o.lat === obj.lat && o.lon === obj.lon)
        );
        return filteredArray;
    };

    return (
        <Card
            sx={{
                ...boxStyle,
                height: 350,
                width: 280,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {!cities.length && (
                <form onSubmit={onGetListCity}>
                    <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                        height={'100%'}
                    >
                        <Grid item>
                            <TextField
                                id='outlined-basic'
                                label='City'
                                variant='outlined'
                                {...register('cityName', {
                                    required: 'Field is required'
                                })}
                            />
                            <Typography component={'div'}>
                                {errors.cityName && (
                                    <Typography color={'red'}>
                                        {errors.cityName.message || 'Error'}
                                    </Typography>
                                )}
                            </Typography>
                        </Grid>
                        <Typography
                            textAlign={'center'}
                            component={'div'}
                            color={'red'}
                        >
                            {!isValid && errorWeather}
                            {isValid && errorCity}
                        </Typography>
                        <Grid item mt={5}>
                            <IconButton
                                disabled={isLoadingCity}
                                type='submit'
                                color='success'
                                sx={{
                                    ...buttonStyle,
                                    border: '1px solid rgba(46, 125, 50, 0.5)'
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            )}
            {
                <List>
                    {filterDublicateCity(cities).map(city => {
                        return (
                            <ListItem
                                key={`${city.lat}${city.lon}`}
                                onClick={() =>
                                    onSubmitCity(
                                        `${city.name}${
                                            city.state ? `,${city.state}` : ''
                                        },${city.country}`
                                    )
                                }
                                disablePadding
                                sx={{
                                    border: '1px solid rgba(73, 72, 74, 0.5)',
                                    borderRadius: 1,
                                    marginBottom: 1
                                }}
                            >
                                <ListItemButton>
                                    <ListItemText
                                        primary={`${city.name}, ${
                                            city.country
                                        }${
                                            city.state ? `, ${city.state}` : ''
                                        }`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            }
        </Card>
    );
};

export default FormAddCard;
