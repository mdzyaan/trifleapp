// Imports: Dependencies
import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
// Worker: Increase Counter Async (Delayed By 4 Seconds)
import { getFirebase } from '../../utils/firebase';
import firebaseObjectToArray from '../../utils/firebaseObjectToArray';

import { HOME_START } from './constants';
import { HomeAction } from './actions';



function* fetchArticleData({ metadata }) {
    try {
        let data = {};

        yield getFirebase()
            .database()
            .ref(`/appData/recommended/article`)
            .orderByChild("date")
            .once("value")
            .then(snapshot => {
                data.data = firebaseObjectToArray(snapshot);
            });
        yield put(HomeAction.success(data.data));
    }
    catch (error) {
        console.log(error);
    }
};



// Watcher saga
export function* homeSaga() {
    // Take Last Action Only
    yield takeLatest(HOME_START, fetchArticleData);
};