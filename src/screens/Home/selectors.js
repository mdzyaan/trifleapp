import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.home || initialState;

const makeSelectHomeState = () => createSelector( selectHomeDomain, subState => subState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.error,
  );



export { makeSelectHomeState, makeSelectLoading, makeSelectError };