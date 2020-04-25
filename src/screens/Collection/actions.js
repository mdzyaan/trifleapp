/*
 *
 * Collection actions
 *
 */

import { COLLECTION_START, COLLECTION_SUCCESS, COLLECTION_ERROR } from './constants';

export const CollectionAction = {
  start: ({ payload, metadata }) => {
    return {
      type: COLLECTION_START, 
      payload, 
      metadata
    }
  },
  success: ({ payload, metadata }) => {
    return {
      type: COLLECTION_SUCCESS,
      payload,
      metadata
    }
  },
  error: ({ error }) => {
    return {
      type: COLLECTION_ERROR,
      payload,
      metadata
    }
  }
};
