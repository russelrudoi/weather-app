import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { fontStyle } from './styles/theme-style';
import { store } from './store/store';
import './styles/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={fontStyle}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ThemeProvider>
);
