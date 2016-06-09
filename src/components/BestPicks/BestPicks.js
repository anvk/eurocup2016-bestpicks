import React, { Component } from 'react';

class BestPicksRow extends Component {
  render() {
    const {
      teams,
      label,
      points,
      p1,
      p2,
      p3,
      p4,
      pA
    } = this.props;

    return (
      <tr>
        <td>{p1}</td>
        <td>{p2}</td>
        <td>{p3}</td>
        <td>{p4}</td>
        <td>{pA}</td>
        <td>{points}</td>
      </tr>
    );
  }
}

class BestPicks extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <caption>Best Picks:</caption>
        <thead>
          <tr>
            <th>Pot 1</th>
            <th>Pot 2</th>
            <th>Pot 3</th>
            <th>Pot 4</th>
            <th>Extra</th>
            <th>Total Points:</th>
          </tr>
        </thead>
        <tbody>
          {this.props.bestPicks.map(pick =>
            <BestPicksRow key={pick.label} {...pick} />
          )}
        </tbody>
      </table>
    );
  }
}

export default BestPicks;
