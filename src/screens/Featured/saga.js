// Imports: Dependencies
import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
// Worker: Increase Counter Async (Delayed By 4 Seconds)
import { getFirebase } from '../../utils/firebase';
import  firebaseObjectToArray  from '../../utils/firebaseObjectToArray';

import { FEATURED_START } from './constants';
import { FeaturedAction } from './actions';



function* fetchArticleData({ metadata }) {
    try {
        let data = {};

        yield getFirebase()
            .database()
            .ref(`/appData/featured/article`)
            .orderByChild("date")
            .once("value")
            .then(snapshot => {
                data.data = firebaseObjectToArray(snapshot);
            });
        yield put(FeaturedAction.success(data.data));
    }
    catch (error) {
        console.log(error);
    }
};



// Watcher saga
export function* featuredSaga() {
    // Take Last Action Only
    yield takeLatest(FEATURED_START, fetchArticleData);
};