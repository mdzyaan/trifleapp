/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { HOME_START, HOME_SUCCESS, HOME_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: []
};

const homeReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case HOME_START:
        draft.loading = true;
        draft.error = false;
        break;

      case HOME_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload;
        break;
        
      case HOME_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default homeReducer;