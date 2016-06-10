import React, { Component } from 'react';

class Finalist extends Component {
  render() {
    return (
      <table className="table table-striped table-hover">
        <caption>Finalist</caption>
        <thead>
          <tr>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.finalist || 'Please Fill the Form Above'}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Finalist;
