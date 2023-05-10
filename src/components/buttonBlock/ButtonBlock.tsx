import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ArrowBack, Update } from '@mui/icons-material';
import { buttonColor, buttonStyle } from '../../styles/theme-style';

interface Props {
    isLoading: boolean | undefined;
    handlerUpdate: () => void;
}

const ButtonBlock: FC<Props> = ({ isLoading, handlerUpdate }) => {
    return (
        <Grid container columnGap={5}>
            <Grid item>
                <ThemeProvider theme={buttonColor}>
                    <Link to='/'>
                        <LoadingButton variant='contained' sx={buttonStyle}>
                            <ArrowBack />
                        </LoadingButton>
                    </Link>
                </ThemeProvider>
            </Grid>
            <Grid item>
                <LoadingButton
                    loading={isLoading}
                    onClick={handlerUpdate}
                    variant='contained'
                    sx={buttonStyle}
                >
                    <Update />
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default ButtonBlock;
