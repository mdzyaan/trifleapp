import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import appReducer from '../screens/App/reducer';
import collectionReducer from '../screens/Collection/reducer';
import onboardingReducer from '../screens/Onboarding/reducer';
import featuredReducer from '../screens/Featured/reducer';
import homeReducer from '../screens/Home/reducer';
import { rootSaga } from './rootSaga';
import createSagaMiddleware from 'redux-saga';

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {

    // Middleware: Redux Saga
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers({
            app: appReducer,
            collection: collectionReducer,
            onboarding: onboardingReducer,
            home: homeReducer,
            featured: featuredReducer,

        }),
        composeEnhansers(applyMiddleware(sagaMiddleware))
    );

    // Middleware: Redux Saga
    sagaMiddleware.run(rootSaga);

    return store;
}


