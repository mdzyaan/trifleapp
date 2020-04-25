/*
 *
 * Onboarding actions
 *
 */

import { ONBOARDING_START, ONBOARDING_SUCCESS, ONBOARDING_ERROR } from './constants';

export const OnboardingAction = {
  start: ({ payload, metadata }) => {
    return {
      type: ONBOARDING_START, 
      payload, 
      metadata
    }
  },
  success: ({ payload, metadata }) => {
    return {
      type: ONBOARDING_SUCCESS,
      payload,
      metadata
    }
  },
  error: ({ error }) => {
    return {
      type: ONBOARDING_ERROR,
      payload,
      metadata
    }
  }
};
