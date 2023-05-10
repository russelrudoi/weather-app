import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Grid } from '@mui/material';
import CardItem from '../cardItem/CardItem';
import FormAddCard from '../formAddCard/FormAddCard';

const CardList: FC = () => {
    const { weather } = useAppSelector(state => state.currentWeatherReducer);

    return (
        <Grid container gap={10}>
            {weather.map(item => {
                return <CardItem key={item.id} weather={item} />;
            })}

            <FormAddCard />
        </Grid>
    );
};

export default CardList;
