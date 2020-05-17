// Imports: Dependencies
import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
// Worker: Increase Counter Async (Delayed By 4 Seconds)
import { getFirebase } from '../../utils/firebase';

import { APP_START, APP_SUCCESS, APP_ERROR } from './constants';
import { AppAction } from './actions';

function* fetchAppData() {
    try {
        let data = {};

        yield getFirebase()
            .database()
            .ref("/appData")
            .orderByChild("date")
            .once("value")
            .then(snapshot => {
                data.data = snapshot.val();
                
            });
        yield put(AppAction.success(data.data));
    }
    catch (error) {
        console.log(error);
    }
};
// Watcher: Increase Counter Async
export function* appSaga() {
    // Take Last Action Only
    yield takeLatest(APP_START, fetchAppData);
};