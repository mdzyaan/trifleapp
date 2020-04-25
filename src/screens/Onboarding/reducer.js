/*
 *
 * Onboarding reducer
 *
 */
import produce from 'immer';
import { ONBOARDING_START, ONBOARDING_SUCCESS, ONBOARDING_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: {
    hello: 'hello'
  }
};

const onboardingReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ONBOARDING_START:
        draft.loading = true;
        draft.error = false;
        break;

      case ONBOARDING_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload.data
        break;
        
      case ONBOARDING_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default onboardingReducer;