/*
 *
 * Webview reducer
 *
 */
import produce from 'immer';
import { WEBVIEW_START, WEBVIEW_SUCCESS, WEBVIEW_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: {}
};

const webviewReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case WEBVIEW_START:
        draft.loading = true;
        draft.error = false;
        break;

      case WEBVIEW_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload.data
        break;
        
      case WEBVIEW_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default webviewReducer;