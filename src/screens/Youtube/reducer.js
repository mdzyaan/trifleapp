/*
 *
 * Youtube reducer
 *
 */
import produce from 'immer';
import { YOUTUBE_START, YOUTUBE_SUCCESS, YOUTUBE_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: {}
};

const youtubeReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case YOUTUBE_START:
        draft.loading = true;
        draft.error = false;
        break;

      case YOUTUBE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload.data
        break;
        
      case YOUTUBE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default youtubeReducer;