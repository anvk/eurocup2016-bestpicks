import React, { Component } from 'react';
import { getFlag } from '../../reducers/euroCup.js';

class PotRow extends Component {
  render() {
    const { entry } = this.props;

    return (
      <tr>
        <td>
          <img
            src={getFlag(entry)}
            className="img-responsive"
            alt={entry}
          />
        </td>
        <td>{entry}</td>
      </tr>
    );
  }
}

class Pot extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{this.props.label}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(entry =>
            <PotRow key={entry} entry={entry} />
          )}
        </tbody>
      </table>
    );
  }
}

export default Pot;
