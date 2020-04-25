/*
 *
 * Collection reducer
 *
 */
import produce from 'immer';
import { COLLECTION_START, COLLECTION_SUCCESS, COLLECTION_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: {}
};

const collectionReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case COLLECTION_START:
        draft.loading = true;
        draft.error = false;
        break;

      case COLLECTION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload.data
        break;
        
      case COLLECTION_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default collectionReducer;