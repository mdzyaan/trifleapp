/*
 *
 * Webview actions
 *
 */

import { WEBVIEW_START, WEBVIEW_SUCCESS, WEBVIEW_ERROR } from './constants';

export const WebviewAction = {
  start: ({ payload, metadata }) => {
    return {
      type: WEBVIEW_START, 
      payload, 
      metadata
    }
  },
  success: ({ payload, metadata }) => {
    return {
      type: WEBVIEW_SUCCESS,
      payload,
      metadata
    }
  },
  error: ({ error }) => {
    return {
      type: WEBVIEW_ERROR,
      payload,
      metadata
    }
  }
};
