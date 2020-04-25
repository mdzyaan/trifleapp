import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the collection state domain
 */

const selectCollectionDomain = state => state.collection || initialState;

const makeSelectCollectionState = () => createSelector( selectCollectionDomain, subState => subState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectCollectionDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCollectionDomain,
    subState => subState.error,
  );



export { makeSelectCollectionState, makeSelectLoading, makeSelectError };