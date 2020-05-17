/*
 *
 * Collection reducer
 *
 */
import produce from 'immer';
import { COLLECTION_ARTICLE_START, COLLECTION_ARTICLE_SUCCESS, COLLECTION_ARTICLE_ERROR, COLLECTION_VIDEO_START, COLLECTION_VIDEO_SUCCESS, COLLECTION_VIDEO_ERROR } from './constants';

export const initialState = {
  article: {
    loading: false,
    error: false,
    data: [],
  },
  video: {
    loading: false,
    error: false,
    data: [],
  },
};

const collectionReducer = (state = initialState, action) => {
  return produce(state, draft => {

    switch (action.type) {
      case COLLECTION_ARTICLE_START:
        draft.article.loading = true;
        draft.article.error = false;
        break;

      case COLLECTION_ARTICLE_SUCCESS:
        draft.article.loading = false;
        draft.article.error = false;
        draft.article.data = action.payload
        break;
        
      case COLLECTION_ARTICLE_ERROR:
        draft.article.loading = false;
        draft.article.error = action.error;
        break;

      case COLLECTION_VIDEO_START:
        draft.video.loading = true;
        draft.video.error = false;
        break;

      case COLLECTION_VIDEO_SUCCESS:
        draft.video.loading = false;
        draft.video.error = false;
        draft.video.data = action.payload
        break;
        
      case COLLECTION_VIDEO_ERROR:
        draft.video.loading = false;
        draft.video.error = action.error;
        break;
    }
  });
}


export default collectionReducer;