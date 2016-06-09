import React, { Component } from 'react';

class TeamPointsRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <img
            src={this.props.flag}
            className="img-responsive"
            alt={this.props.name}
          />
        </td>
        <td>{this.props.name}</td>
        <td><strong>{this.props.totalPoints}</strong></td>
        <td>{this.props.points}</td>
        <td>{this.props.totalGoals}</td>
      </tr>
    );
  }
}

class TeamPoints extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <caption>Team Points:</caption>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Total Points</th>
            <th>Points</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {this.props.teams.map(team =>
            <TeamPointsRow key={team.name} {...team} />
          )}
        </tbody>
      </table>
    );
  }
}

export default TeamPoints;
