/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { APP_START, APP_SUCCESS, APP_ERROR, USER_ONBOARD_START, USER_ONBOARD_SUCCESS, USER_ONBOARD_ERROR } from './constants';

export const initialState = {
  loading: true,
  error: false,
  data: {
    appConfig: {
      appearance: {
        mode: 'dark',
      }
    },
    appData:{
      featured: [
      ],
      recommended: [{
        title: "How to be better at stressed",
        readDuration: 5,
        thumbnail: "http://i3.ytimg.com/vi/RcGyVTAoXEU/maxresdefault.jpg",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url: "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
      }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "http://i3.ytimg.com/vi/RcGyVTAoXEU/maxresdefault.jpg",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url: "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
      }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "http://i3.ytimg.com/vi/RcGyVTAoXEU/maxresdefault.jpg",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url: "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
      }],
    },
    user: {
      onboarded: false,
    }
  }
};

const appReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case APP_START:
        draft.loading = true;
        draft.error = false;
        break;

      case APP_SUCCESS:
        
        draft.loading = false;
        draft.error = false;
        draft.data.appData = {
          ...draft.data.appData,
          ...action.payload,
        }
        break;
      case APP_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case USER_ONBOARD_START:
        draft.loading = true;
        draft.error = false;
        break;

      case USER_ONBOARD_SUCCESS:
        draft.loading = false;
        draft.data.user.onboarded = action.metadata.metadata.onboarded
        break;
        
      case USER_ONBOARD_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });
}


export default appReducer;