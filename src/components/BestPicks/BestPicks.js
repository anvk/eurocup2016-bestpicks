import React, { Component } from 'react';

class BestPicksRow extends Component {
  render() {
    return (
      <tr className={this.props.index === 1 ? 'success' : null}>
        <td>{this.props.index}</td>
        <td>{this.props.p1}</td>
        <td>{this.props.p2}</td>
        <td>{this.props.p3}</td>
        <td>{this.props.p4}</td>
        <td>{this.props.pA}</td>
        <td>{this.props.totalPoints}</td>
        <td>{this.props.totalGoals}</td>
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
            <th>#</th>
            <th>Pot 1</th>
            <th>Pot 2</th>
            <th>Pot 3</th>
            <th>Pot 4</th>
            <th>Extra</th>
            <th>Total Points:</th>
            <th>Total Goals:</th>
          </tr>
        </thead>
        <tbody>
          {this.props.bestPicks.map((pick, index) =>
            <BestPicksRow
              {...pick}
              key={pick.id}
              index={index + 1}
            />
          )}
        </tbody>
      </table>
    );
  }
}

export default BestPicks;
