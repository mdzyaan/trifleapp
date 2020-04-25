import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the onboarding state domain
 */

const selectOnboardingDomain = state => state.onboarding || initialState;

const makeSelectOnboardingState = () => createSelector( selectOnboardingDomain, subState => subState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectOnboardingDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectOnboardingDomain,
    subState => subState.error,
  );



export { makeSelectOnboardingState, makeSelectLoading, makeSelectError };