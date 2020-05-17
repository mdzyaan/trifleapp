/*
 *
 * App actions
 *
 */

import { APP_START, APP_SUCCESS, APP_ERROR, USER_ONBOARD_START, USER_ONBOARD_SUCCESS, USER_ONBOARD_ERROR } from './constants';

export const AppAction = {
  start: () => {
    return {
      type: APP_START, 
    }
  },
  success: (data) => {
    return {
      type: APP_SUCCESS,
      payload: data,
    }
  },
  error: ({ error }) => {
    return {
      type: APP_ERROR,
      payload,
      metadata
    }
  }
};

export const userOnboardAction = {
  start: ({ metadata }) => {
    return {
      type: USER_ONBOARD_START, 
      payload, 
      metadata
    }
  },
  success: (metadata) => {
    return {
      type: USER_ONBOARD_SUCCESS,
      metadata
    }
  },
  error: ({ error }) => {
    return {
      type: USER_ONBOARD_ERROR,
      payload: error,
    }
  }
};

