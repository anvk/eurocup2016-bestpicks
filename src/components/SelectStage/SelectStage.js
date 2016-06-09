import React, { Component } from 'react';
import { getFlag, DRAW } from '../../reducers/euroCup.js';
import defaultTeams from '../../constants/defaultTeams.js';

class SelectStageRow extends Component {
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
          <select
            name="team1"
            value={team1 || ''}
            onChange={event => {
              const { value, name } = event.target;
              onChange(matchId, name, value);
            }}
          >
            <option key="" value="">Please Select</option>
            {defaultTeams.map(team =>
              <option
                key={team.name}
                value={team.name}
              >
                {team.name}
              </option>
            )}
          </select>
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
          <select
            name="winner"
            className={(!team1 && !team2) ? 'disabled' : undefined}
            value={winner || ''}
            onChange={event => {
              const { value, name } = event.target;
              onChange(matchId, name, value);
            }}
          >
            <option value="">{'???'}</option>
            <option value={team1}>{'>>>'}</option>
            <option value={team2}>{'<<<'}</option>
          </select>
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
          <select
            name="team2"
            value={team2 || ''}
            onChange={event => {
              const { value, name } = event.target;
              onChange(matchId, name, value);
            }}
          >
            <option key="" value="">Please Select</option>
            {defaultTeams.map(team =>
              <option
                key={team.name}
                value={team.name}
              >
                {team.name}
              </option>
            )}
          </select>
        </td>
      </tr>
    );
  }
}

class SelectStage extends Component {
  render() {
    const { onChange } = this.props;

    return (
      <table className="table table-striped table-hover">
        <caption>{this.props.label}</caption>
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
            <SelectStageRow
              key={match.matchId}
              {...match}
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

export default SelectStage;
