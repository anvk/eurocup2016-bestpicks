import * as types from '../constants/actionTypes.js';

const initialState = {
  matchId: undefined,
  team1: undefined,
  team2: undefined,
  goal1: 0,
  goal2: 0,
  winner: undefined
};

export const DRAW = 'DRAW';

export function getLabel(goal1, goal2) {
  if (goal1 === goal2) {
    return ' draw with ';
  }
  else if (goal1 > goal2) {
    return ' wins against ';
  }
  else if (goal1 < goal2) {
    return ' loses against ';
  }
}

export default function match(state = initialState, action) {
  switch (action.type) {
    case types.EUROCUP_CHANGE_VALUE:
      if (state.matchId !== action.matchId) {
        return state;
      }

      let winner = state.winner;

      if (state.goal1 === state.goal2) {
        winner = DRAW;
      }
      else if (state.goal1 > state.goal2) {
        winner = state.team1;
      }
      else if (state.goal2 < state.goal1) {
        winner = state.team2;
      }

      return {
        ...state,
        [action.name]: action.value,
        winner
      };
    default:
      // nothing to do
      return state;
  }
}
