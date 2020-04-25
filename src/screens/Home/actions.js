/*
 *
 * Home actions
 *
 */

import { HOME_START, HOME_SUCCESS, HOME_ERROR } from './constants';

export const HomeAction = {
  start: ({ payload, metadata }) => {
    return {
      type: HOME_START, 
      payload, 
      metadata
    }
  },
  success: ({ payload, metadata }) => {
    return {
      type: HOME_SUCCESS,
      payload,
      metadata
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
