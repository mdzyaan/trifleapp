/*
 *
 * Home actions
 *
 */

import { HOME_START, HOME_SUCCESS, HOME_ERROR } from './constants';

export const HomeAction = {
  start: () => {
    return {
      type: HOME_START, 
    }
  },
  success: (data) => {
    return {
      type: HOME_SUCCESS,
      payload: data,
    }
  },
  error: ({ error }) => {
    return {
      type: HOME_ERROR,
      payload,
      metadata
    }
  }
};
