import React, { FC } from 'react';
import CardList from '../components/cardList/CardList';

const MainPage: FC = () => {
    return (
        <>
            <CardList data-testid={'main-page'} />
        </>
    );
};

export default MainPage;
