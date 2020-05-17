import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the featured state domain
 */

const selectFeaturedDomain = state => state.featured || initialState;

const makeSelectFeaturedState = () => createSelector( selectFeaturedDomain, subState => subState);

/**
 * Other specific selectors
 */



const makeSelectArticleData = () =>
  createSelector(
    selectFeaturedDomain,
    subState => subState.data,
  );


const makeSelectLoading = () =>
  createSelector(
    selectFeaturedDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectFeaturedDomain,
    subState => subState.error,
  );



export { makeSelectFeaturedState, makeSelectLoading, makeSelectError, makeSelectArticleData };