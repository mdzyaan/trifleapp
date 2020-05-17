/*
 *
 * Featured reducer
 *
 */
import produce from 'immer';
import { FEATURED_START, FEATURED_SUCCESS, FEATURED_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: []
};

const featuredReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case FEATURED_START:
        draft.loading = true;
        draft.error = false;
        break;

      case FEATURED_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload
        break;
        
      case FEATURED_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default featuredReducer;