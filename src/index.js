import React from 'react';
import {Provider} from 'react-redux';
import App from './screens/App';
import configureStore from './store/configureStore';
import { AppearanceProvider } from 'react-native-appearance';


const store = configureStore();


const Root = () => (
    <Provider store={store}>
        <AppearanceProvider>
            <App />
        </AppearanceProvider>
    </Provider>
);



export default Root;