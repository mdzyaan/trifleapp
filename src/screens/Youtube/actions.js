/*
 *
 * Youtube actions
 *
 */

import { YOUTUBE_START, YOUTUBE_SUCCESS, YOUTUBE_ERROR } from './constants';

export const YoutubeAction = {
  start: ({ payload, metadata }) => {
    return {
      type: YOUTUBE_START, 
      payload, 
      metadata
    }
  },
  success: ({ payload, metadata }) => {
    return {
      type: YOUTUBE_SUCCESS,
      payload,
      metadata
    }
  },
  error: ({ error }) => {
    return {
      type: YOUTUBE_ERROR,
      payload,
      metadata
    }
  }
};
