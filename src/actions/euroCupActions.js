import * as types from '../constants/actionTypes.js';

export const reset = () => ({ type: types.EUROCUP_RESET });

export const calculate = () => ({ type: types.EUROCUP_CALCULATE });

export const changeValue = (matchType, matchId, name, value) => ({
  type: types.EUROCUP_CHANGE_VALUE,
  matchType,
  matchId,
  value,
  name
});
