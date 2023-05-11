import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('App', () => {
    it('should header render', () => {
        render(
            <Router>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>
        );

        expect(screen.getByText('Weather app')).toBeInTheDocument();
    });
});
