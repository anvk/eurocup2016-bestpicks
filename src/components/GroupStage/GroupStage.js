import React, { Component } from 'react';
import { getFlag } from '../../constants/defaultTeams.js';
import { DRAW, getLabel } from '../../reducers/match.js';

class GroupStageRow extends Component {
  render() {
    const {
      matchId,
      team1,
      team2,
      flag1,
      flag2,
      goal1,
      goal2,
      winner,
      onChange
    } = this.props;

    return (
      <tr>
        <td>{matchId}</td>
        <td>
          {team1}
          <img
            src={flag1}
            className="img-responsive"
            alt={team1}
          />
        </td>
        <td>
          <input
            className="width-xs"
            name="goal1"
            value={goal1}
            onChange={event => {
              const { name } = event.target;
              let { value } = event.target;
              value = value.replace(/\D/g, '');
              if (!value.length) {
                value = 0;
              }

              onChange(matchId, name, parseInt(value));
            }}
          />
          {getLabel(goal1, goal2)}
          <input
            className="width-xs"
            name="goal2"
            value={goal2}
            onChange={event => {
              const { name } = event.target;
              let { value } = event.target;
              value = value.replace(/\D/g, '');
              if (!value.length) {
                value = 0;
              }

              onChange(matchId, name, parseInt(value));
            }}
          />
        </td>
        <td>
          {team2}
          <img
            src={flag2}
            className="img-responsive"
            alt={team2}
          />
        </td>
      </tr>
    );
  }
}

class GroupStage extends Component {
  render() {
    const { onChange } = this.props;

    return (
      <table className="table table-striped table-hover">
        <caption>Group Stage:</caption>
        <thead>
          <tr key={0}>
            <th>#</th>
            <th>Team 1</th>
            <th>Match Result</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(match =>
            <GroupStageRow
              {...match}
              key={match.matchId}
              flag1={getFlag(match.team1)}
              flag2={getFlag(match.team2)}
              onChange={onChange}
            />
          )}
        </tbody>
      </table>
    );
  }
}

export default GroupStage;
