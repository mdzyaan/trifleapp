/*
 *
 * Featured actions
 *
 */

import { FEATURED_START, FEATURED_SUCCESS, FEATURED_ERROR } from './constants';

export const FeaturedAction = {
  start: () => {
    return {
      type: FEATURED_START, 
    }
  },
  success: (data) => {
    return {
      type: FEATURED_SUCCESS,
      payload: data
    }
  },
  error: ({ error }) => {
    return {
      type: FEATURED_ERROR,
      payload,
      metadata
    }
  }
};
