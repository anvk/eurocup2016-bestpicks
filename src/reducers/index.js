import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import tabLocation from './tabLocation.js';
import euroCup from './euroCup.js';

export default combineReducers({
  tabLocation,
  euroCup,

  routing: routeReducer
});
