/**
 *
 */

'use strict';

import { combineReducers } from 'redux';

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case 'SELECT_SUBREDDIT':
      return action.subreddit
    default:
      return state
  }
}

module.exports = combineReducers({
  selectedSubreddit
});
