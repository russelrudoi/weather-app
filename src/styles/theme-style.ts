import { createTheme } from '@mui/material';

export const fontStyle = createTheme({
    typography: {
        fontFamily: [
            'Roboto Condensed',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        allVariants: {
            color: '#49484A'
        }
    }
});

export const buttonColor = createTheme({
    palette: {
        primary: {
            main: '#EFE5E5'
        }
    }
});

export const boxStyle = {
    backgroundColor: '#EFE5E5',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px'
};

export const buttonStyle = {
    minWidth: 50,
    minHeight: 50,
    padding: 0,
    borderRadius: '50%'
};
