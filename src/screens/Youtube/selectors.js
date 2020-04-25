import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the youtube state domain
 */

const selectYoutubeDomain = state => state.youtube || initialState;

const makeSelectYoutubeState = () => createSelector( selectYoutubeDomain, subState => subState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectYoutubeDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectYoutubeDomain,
    subState => subState.error,
  );



export { makeSelectYoutubeState, makeSelectLoading, makeSelectError };