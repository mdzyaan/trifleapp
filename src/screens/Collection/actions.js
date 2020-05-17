/*
 *
 * Collection actions
 *
 */

import { COLLECTION_ARTICLE_START, COLLECTION_ARTICLE_SUCCESS, COLLECTION_ARTICLE_ERROR, COLLECTION_VIDEO_START, COLLECTION_VIDEO_SUCCESS, COLLECTION_VIDEO_ERROR } from './constants';

export const CollectionArticleAction = {
  start: ({ metadata }) => {
    return {
      type: COLLECTION_ARTICLE_START,
      metadata
    }
  },
  success: (data) => {
    return {
      type: COLLECTION_ARTICLE_SUCCESS,
      payload: data,
    }
  },
  error: ({ error }) => {
    return {
      type: COLLECTION_ARTICLE_ERROR,
      payload,
      metadata
    }
  }
};

export const CollectionVideoAction = {
  start: ({ metadata }) => {
    return {
      type: COLLECTION_VIDEO_START,
      metadata
    }
  },
  success: (data) => {
    return {
      type: COLLECTION_VIDEO_SUCCESS,
      payload: data,
    }
  },
  error: ({ error }) => {
    return {
      type: COLLECTION_VIDEO_ERROR,
      payload: error,
    }
  }
};
