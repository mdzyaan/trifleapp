import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = state => state.app || initialState;

const makeSelectAppState = () => createSelector( selectAppDomain, subState => subState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectAppDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAppDomain,
    subState => subState.error,
  );

const makeSelectAppDataRecommended = () =>
  createSelector(
    selectAppDomain,
    subState => subState.data.appData.recommended,
  );

const makeSelectAppDataFeatured = () =>
  createSelector(
    selectAppDomain,
    subState => subState.data.appData.featured,
  );


const makeSelectUserOnboardingStatus = () =>
  createSelector(
    selectAppDomain,
    subState => subState.data.user.onboarded
  );


export { makeSelectAppState, makeSelectLoading, makeSelectError, makeSelectUserOnboardingStatus, makeSelectAppDataRecommended, makeSelectAppDataFeatured };