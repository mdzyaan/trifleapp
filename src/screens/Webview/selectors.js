import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the webview state domain
 */

const selectWebviewDomain = state => state.webview || initialState;

const makeSelectWebviewState = () => createSelector( selectWebviewDomain, subState => subState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectWebviewDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectWebviewDomain,
    subState => subState.error,
  );



export { makeSelectWebviewState, makeSelectLoading, makeSelectError };