import * as types from '../constants/actionTypes.js';
import match from './match.js';
import defaultTeams from '../constants/defaultTeams.js';
import { pot1, pot2, pot3, pot4 } from '../constants/pots.js';
import { groupStage, roundOf16, quarterFinals, semiFinals, finals } from '../constants/matches.js';
import pointSystem from '../constants/pointSystem.js';

const initialState = {
  teams: [ ...defaultTeams],
  groupStage: [ ...groupStage],
  roundOf16: [ ...roundOf16],
  quarterFinals: [ ...quarterFinals],
  semiFinals: [ ...semiFinals],
  finals: [ ...finals],
  pot1,
  pot2,
  pot3,
  pot4,
  bestPicks: []
};

export const SHOW_N_TOP_PICKS = 10;

export const DRAW = 'DRAW';

export const MATCH_GROUPSTAGE = 'MATCH_GROUPSTAGE';
export const MATCH_ROUNDOF16 = 'MATCH_ROUNDOF16';
export const MATCH_QUARTERFINALS = 'MATCH_QUARTERFINALS';
export const MATCH_SEMIFINALS = 'MATCH_SEMIFINALS';
export const MATCH_FINALS = 'MATCH_FINALS';

function findTeamByName(teams, teamName) {
  return teams.find(team => team.name === teamName) || {};
}

export function getFlag(teamName) {
  return findTeamByName(defaultTeams, teamName).flag;
}

export function sortByPoints(team1, team2) {
  if (team1.points > team2.points) {
    return -1;
  }
  if (team1.points < team2.points) {
    return 1;
  }
  // team1 must be equal to team2
  return 0;
}

function copy(array = []) {
  return JSON.parse(JSON.stringify(array));
}

function getTeamWithPoints(state) {
  const { groupStage, roundOf16, quarterFinals, semiFinals, finals } = state;
  let result = copy(defaultTeams);
  let team1, team2;
  let visited = []

  for (let e of groupStage) {
    team1 = findTeamByName(result, e.team1);
    team2 = findTeamByName(result, e.team2);

    team1.totalGoals += e.goal1;
    team2.totalGoals += e.goal2;

    if (e.winner && e.winner.length) {
      if (e.winner === DRAW) {
        team1.points += pointSystem.draw;
        team2.points += pointSystem.draw;
      } else {
        findTeamByName(result, e.winner).points += pointSystem.win;
      }
    }
  }

  visited = [];
  for (let e of roundOf16) {
    team1 = findTeamByName(result, e.team1);
    team2 = findTeamByName(result, e.team2);

    team1.totalGoals += e.goal1;
    team2.totalGoals += e.goal2;

    if (e.team1 && !visited.includes(e.team1)) {
      team1.points += pointSystem.roundOf16;
      visited.push(e.team1);
    }

    if (e.team2 && !visited.includes(e.team2)) {
      team2.points += pointSystem.roundOf16;
      visited.push(e.team2);
    }

    if (e.winner && e.winner.length) {
      findTeamByName(result, e.winner).points += pointSystem.win;
      visited.push(e.team2);
    }
  }

  visited = [];
  for (let e of quarterFinals) {
    team1 = findTeamByName(result, e.team1);
    team2 = findTeamByName(result, e.team2);

    team1.totalGoals += e.goal1;
    team2.totalGoals += e.goal2;

    if (e.team1 && !visited.includes(e.team1)) {
      team1.points += pointSystem.quarterFinals;
      visited.push(e.team1);
    }

    if (e.team2 && !visited.includes(e.team2)) {
      team2.points += pointSystem.quarterFinals;
      visited.push(e.team2);
    }

    if (e.winner && e.winner.length) {
      findTeamByName(result, e.winner).points += pointSystem.win;
      visited.push(e.team2);
    }
  }

  visited = [];
  for (let e of semiFinals) {
    team1 = findTeamByName(result, e.team1);
    team2 = findTeamByName(result, e.team2);

    team1.totalGoals += e.goal1;
    team2.totalGoals += e.goal2;

    if (e.team1 && !visited.includes(e.team1)) {
      team1.points += pointSystem.semiFinals;
      visited.push(e.team1);
    }

    if (e.team2 && !visited.includes(e.team2)) {
      team2.points += pointSystem.semiFinals;
      visited.push(e.team2);
    }

    if (e.winner && e.winner.length) {
      findTeamByName(result, e.winner).points += pointSystem.win;
      visited.push(e.team2);
    }
  }

  visited = [];
  for (let e of finals) {
    team1 = findTeamByName(result, e.team1);
    team2 = findTeamByName(result, e.team2);

    team1.totalGoals += e.goal1;
    team2.totalGoals += e.goal2;

    if (e.team1 && !visited.includes(e.team1)) {
      team1.points += pointSystem.finals;
      visited.push(e.team1);
    }

    if (e.team2 && !visited.includes(e.team2)) {
      team2.points += pointSystem.finals;
      visited.push(e.team2);
    }

    if (e.winner && e.winner.length) {
      findTeamByName(result, e.winner).points += pointSystem.win;
      findTeamByName(result, e.winner).points += pointSystem.winner;
      visited.push(e.team2);
    }
  }

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
  let points, pick;

  for (let p1 of pot1) {
    for (let p2 of pot2) {
      for (let p3 of pot3) {
        for (let p4 of pot4) {
          for (let pA of potAll) {
            // pA cannot be a duplicate of a selected team in the pick
            if ([p1, p2, p3, p4].includes(pA)) {
              continue;
            }

            points = findTeamByName(teams, p1).totalPoints +
              findTeamByName(teams, p2).totalPoints +
              findTeamByName(teams, p3).totalPoints +
              findTeamByName(teams, p4).totalPoints +
              findTeamByName(teams, pA).totalPoints;

            pick = [pA, p1, p2, p3, p4];

            result.push({
              p1,
              p2,
              p3,
              p4,
              pA,
              teams: pick,
              label: pick.join('-'),
              points
            });
          }
        }
      }
    }
  }

  return result.sort(sortByPoints).slice(0, SHOW_N_TOP_PICKS);
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

      return {
        ...state,
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
        return {
          ...state,
          finals: state.finals.map(e => match(e, action))
        };
      }

      return state;
    default:
      // nothing to do
      return state;
  }
}
