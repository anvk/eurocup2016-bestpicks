import * as types from '../constants/actionTypes.js';

const initialState = {
  matchId: undefined,
  team1: undefined,
  team2: undefined,
  goal1: 0,
  goal2: 0,
  winner: undefined
};

export default function match(state = initialState, action) {
  switch (action.type) {
    case types.EUROCUP_CHANGE_VALUE:
      if (state.matchId !== action.matchId) {
        return state;
      }

      return {
        ...state,
        [action.name]: action.value
      };
    default:
      // nothing to do
      return state;
  }
}
