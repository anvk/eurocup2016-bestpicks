import FranceFlag from '../../static/images/France.svg.png';
import RomaniaFlag from '../../static/images/Romania.svg.png';
import SwitzerlandFlag from '../../static/images/Switzerland.svg.png';
import CroatiaFlag from '../../static/images/Croatia.svg.png';
import EnglandFlag from '../../static/images/England.svg.png';
import PolandFlag from '../../static/images/Poland.svg.png';
import GermanyFlag from '../../static/images/Germany.svg.png';
import TurkeyFlag from '../../static/images/Turkey.svg.png';
import SlovakiaFlag from '../../static/images/Slovakia.svg.png';
import SpainFlag from '../../static/images/Spain.svg.png';
import RussiaFlag from '../../static/images/Russia.svg.png';
import UkraineFlag from '../../static/images/Ukraine.svg.png';
import CzechRepublicFlag from '../../static/images/Czech Republic.svg.png';
import AlbaniaFlag from '../../static/images/Albania.svg.png';
import WalesFlag from '../../static/images/Wales.svg.png';
import AustriaFlag from '../../static/images/Austria.svg.png';
import BelgiumFlag from '../../static/images/Belgium.svg.png';
import ItalyFlag from '../../static/images/Italy.svg.png';
import IcelandFlag from '../../static/images/Iceland.svg.png';
import HungaryFlag from '../../static/images/Hungary.svg.png';
import SwedenFlag from '../../static/images/Sweden.svg.png';
import PortugalFlag from '../../static/images/Portugal.svg.png';
import RepublicOfIrelandFlag from '../../static/images/Ireland.svg.png';
import NorthernIrelandFlag from '../../static/images/Northern Ireland.svg.png';

const defaultTeams = [
  {
    name: 'France',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: FranceFlag
  },
  {
    name: 'Switzerland',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: SwitzerlandFlag
  },
  {
    name: 'Romania',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: RomaniaFlag
  },
  {
    name: 'Albania',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: AlbaniaFlag
  },

  {
    name: 'England',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: EnglandFlag
  },
  {
    name: 'Russia',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: RussiaFlag
  },
  {
    name: 'Slovakia',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: SlovakiaFlag
  },
  {
    name: 'Wales',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: WalesFlag
  },

  {
    name: 'Germany',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: GermanyFlag
  },
  {
    name: 'Ukraine',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: UkraineFlag
  },
  {
    name: 'Poland',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: PolandFlag
  },
  {
    name: 'Northern Ireland',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: NorthernIrelandFlag
  },

  {
    name: 'Spain',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: SpainFlag
  },
  {
    name: 'Croatia',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: CroatiaFlag
  },
  {
    name: 'Czech Republic',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: CzechRepublicFlag
  },
  {
    name: 'Turkey',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: TurkeyFlag
  },

  {
    name: 'Belgium',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: BelgiumFlag
  },
  {
    name: 'Italy',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: ItalyFlag
  },
  {
    name: 'Sweden',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: SwedenFlag
  },
  {
    name: 'Republic of Ireland',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: RepublicOfIrelandFlag
  },

  {
    name: 'Portugal',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: PortugalFlag
  },
  {
    name: 'Austria',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: AustriaFlag
  },
  {
    name: 'Hungary',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: HungaryFlag
  },
  {
    name: 'Iceland',
    points: 0,
    totalGoals: 0,
    totalPoints: 0,
    flag: IcelandFlag
  }
];

export function sortByName(team1, team2) {
  if (team1.name < team2.name) {
    return -1;
  }
  if (team1.name > team2.name) {
    return 1;
  }
  // team1 must be equal to team2
  return 0;
}

export function findTeamByName(teams, teamName) {
  return teams.find(team => team.name === teamName) || {};
}

export function getFlag(teamName) {
  return findTeamByName(defaultTeams, teamName).flag;
}

export function sortByTotalPoints(team1, team2) {
  if (team1.totalPoints > team2.totalPoints) {
    return -1;
  }
  if (team1.totalPoints < team2.totalPoints) {
    return 1;
  }
  // team1 must be equal to team2
  return 0;
}

export function sortByTotalPointsAndGoals(team1, team2) {
  const result = sortByTotalPoints(team1, team2);

  if (result !== 0) {
    return result;
  }

  if (team1.totalGoals > team2.totalGoals) {
    return -1;
  }
  if (team1.totalGoals < team2.totalGoals) {
    return 1;
  }
  // team1 must be equal to team2
  return 0;
}

export default defaultTeams.sort(sortByName);
