// Imports: Dependencies
import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
// Worker: Increase Counter Async (Delayed By 4 Seconds)
import { getFirebase } from '../../utils/firebase';

import { COLLECTION_ARTICLE_START, COLLECTION_VIDEO_START } from './constants';
import { CollectionArticleAction, CollectionVideoAction } from './actions';

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

function* fetchArticleCollectionData({metadata}) {
    const { collectionKey } = metadata;
    try {
        let data = {
            article: [],
            video: [],
        };

        yield getFirebase()
            .database()
            .ref(`/appData/collections/${collectionKey}/article`)
            .orderByChild("date")
            .once("value")
            .then(snapshot => {
                data.data = snapshotToArray(snapshot);                
            });
        yield put(CollectionArticleAction.success(data.data));
    }
    catch (error) {
        console.log(error);
    }
};

function* fetchVideoCollectionData({metadata}) {
    const { collectionKey } = metadata;
    try {
        let data = {
            article: [],
            video: [],
        };

        yield getFirebase()
            .database()
            .ref(`/appData/collections/${collectionKey}/video`)
            .orderByChild("date")
            .once("value")
            .then(snapshot => {
                data.data = snapshotToArray(snapshot);
            });
        yield put(CollectionVideoAction.success(data.data));
    }
    catch (error) {
        console.log(error);
    }
};
// Watcher saga
export function* collectionSaga() {
    // Take Last Action Only
    yield takeLatest(COLLECTION_ARTICLE_START, fetchArticleCollectionData);
    yield takeLatest(COLLECTION_VIDEO_START, fetchVideoCollectionData);
};