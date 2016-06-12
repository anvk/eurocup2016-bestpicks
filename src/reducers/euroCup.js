import * as types from '../constants/actionTypes.js';
import match, { DRAW } from './match.js';
import defaultTeams, { findTeamByName, sortByTotalPointsAndGoals } from '../constants/defaultTeams.js';
import { pot1, pot2, pot3, pot4 } from '../constants/pots.js';
import pointSystem from '../constants/pointSystem.js';

import {
  MATCH_GROUPSTAGE,
  MATCH_ROUNDOF16,
  MATCH_QUARTERFINALS,
  MATCH_SEMIFINALS,
  MATCH_FINALS,

  groupStage,
  roundOf16,
  quarterFinals,
  semiFinals,
  finals
} from '../constants/matches.js';

const initialState = {
  teams: [ ...defaultTeams],
  groupStage: [ ...groupStage],
  roundOf16: [ ...roundOf16],
  quarterFinals: [ ...quarterFinals],
  semiFinals: [ ...semiFinals],
  finals: [ ...finals],
  finalist: undefined,
  pot1,
  pot2,
  pot3,
  pot4,
  bestPicks: [],
  finalGoals: 0
};

export const SHOW_N_TOP_PICKS = 30;

function copy(array = []) {
  return JSON.parse(JSON.stringify(array));
}

function getRoundPoints(teams, matches, winPoints, roundPoints) {
  let result = copy(teams);
  let visited = [];
  let team1, team2;

  for (let match of matches) {
    team1 = findTeamByName(result, match.team1);
    team2 = findTeamByName(result, match.team2);

    team1.totalGoals += match.goal1;
    team2.totalGoals += match.goal2;

    if (match.team1 && !visited.includes(match.team1)) {
      team1.points += roundPoints;
      visited.push(match.team1);
    }

    if (match.team2 && !visited.includes(match.team2)) {
      team2.points += roundPoints;
      visited.push(match.team2);
    }

    if (match.winner && match.winner.length) {
      findTeamByName(result, match.winner).points += winPoints;
      visited.push(match.team2);
    }
  }

  return result;
}

function getGroupStagePoints(teams, groupStage, winPoints, drawPoints) {
  let result = copy(defaultTeams);
  let visited = [];
  let team1, team2;

  for (let match of groupStage) {
    team1 = findTeamByName(result, match.team1);
    team2 = findTeamByName(result, match.team2);

    team1.totalGoals += match.goal1;
    team2.totalGoals += match.goal2;

    if (match.winner && match.winner.length) {
      if (match.winner === DRAW) {
        team1.points += drawPoints;
        team2.points += drawPoints;
        continue;
      }

      findTeamByName(result, match.winner).points += winPoints;
    }
  }

  return result;
}

function getTeamWithPoints(state) {
  const {
    groupStage,
    roundOf16,
    quarterFinals,
    semiFinals,
    finals,
    finalist
  } = state;

  let result;

  result = getGroupStagePoints(result, groupStage, pointSystem.win,
    pointSystem.draw);

  result = getRoundPoints(result, roundOf16, pointSystem.win,
    pointSystem.roundOf16);

  result = getRoundPoints(result, quarterFinals, pointSystem.win,
    pointSystem.quarterFinals);

  result = getRoundPoints(result, semiFinals, pointSystem.win,
    pointSystem.semiFinals);

  result = getRoundPoints(result, finals, pointSystem.win,
    pointSystem.finals);

  findTeamByName(result, finalist).points += pointSystem.winner;

  // now count total points
  for (let e of result) {
    e.totalPoints = e.points + e.totalGoals;
  }

  return result;
}

function findBestPicks(state) {
  const { pot1, pot2, pot3, pot4, teams } = state;
  const potAll = [...pot1, ...pot2, ...pot3, ...pot4];
  let result = [];
  let totalPoints, totalGoals, pick;
  let teamP1, teamP2, teamP3, teamP4, teamPA;

  for (let p1 of pot1) {
    for (let p2 of pot2) {
      for (let p3 of pot3) {
        for (let p4 of pot4) {
          for (let pA of potAll) {
            // pA cannot be a duplicate of a selected team in the pick
            if ([p1, p2, p3, p4].includes(pA)) {
              continue;
            }

            teamP1 = findTeamByName(teams, p1);
            teamP2 = findTeamByName(teams, p2);
            teamP3 = findTeamByName(teams, p3);
            teamP4 = findTeamByName(teams, p4);
            teamPA = findTeamByName(teams, pA);

            totalPoints = teamP1.totalPoints +
              teamP2.totalPoints +
              teamP3.totalPoints +
              teamP4.totalPoints +
              teamPA.totalPoints;

            totalGoals = teamP1.totalGoals +
              teamP2.totalGoals +
              teamP3.totalGoals +
              teamP4.totalGoals +
              teamPA.totalGoals;

            pick = [pA, p1, p2, p3, p4];

            result.push({
              id: pick.join('-'),
              p1,
              p2,
              p3,
              p4,
              pA,
              teams: pick,
              totalPoints,
              totalGoals
            });
          }
        }
      }
    }
  }

  return result.sort(sortByTotalPointsAndGoals).slice(0, SHOW_N_TOP_PICKS);
}

export default function euroCup(state = initialState, action) {
  switch (action.type) {
    case types.EUROCUP_RESET:
      return { ...initialState };
    case types.EUROCUP_CALCULATE:
      state = {
        ...state,
        teams: getTeamWithPoints(state)
      };

      const finalGoals = state.teams.reduce((total, team) => {
        return total + team.totalGoals;
      }, 0);

      return {
        ...state,
        finalGoals,
        bestPicks: findBestPicks(state)
      };
    case types.EUROCUP_CHANGE_VALUE:
      if (action.matchType === MATCH_GROUPSTAGE) {
        return {
          ...state,
          groupStage: state.groupStage.map(e => match(e, action))
        };
      }
      else if (action.matchType === MATCH_ROUNDOF16) {
        return {
          ...state,
          roundOf16: state.roundOf16.map(e => match(e, action))
        };
      }
      else if (action.matchType === MATCH_QUARTERFINALS) {
        return {
          ...state,
          quarterFinals: state.quarterFinals.map(e => match(e, action))
        };
      }
      else if (action.matchType === MATCH_SEMIFINALS) {
        return {
          ...state,
          semiFinals: state.semiFinals.map(e => match(e, action))
        };
      }
      else if (action.matchType === MATCH_FINALS) {
        state = {
          ...state,
          finals: state.finals.map(e => match(e, action))
        };

        return {
          ...state,
          finalist: state.finals[0].winner
        };
      }

      return state;
    default:
      // nothing to do
      return state;
  }
}
