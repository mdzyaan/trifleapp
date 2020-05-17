import { all, fork } from 'redux-saga/effects';
// Imports: Redux Sagas
// import { watchIncreaseCounter, watchDecreaseCounter } from './counterSaga';
// Redux Saga: Root Saga

import { appSaga } from '../screens/App/saga';
import { collectionSaga } from '../screens/Collection/saga';
import { featuredSaga } from '../screens/Featured/saga';
import { homeSaga } from '../screens/Home/saga';

export function* rootSaga() {
    yield all([
        fork(appSaga),
        fork(collectionSaga),
        fork(featuredSaga),
        fork(homeSaga),
    ]);
};