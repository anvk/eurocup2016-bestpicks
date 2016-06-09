import React, { Component } from 'react';

class EuroCup extends Component {
  render() {
    debugger;
    return (
      <div>
        <h1>EuroCup 2016</h1>

        {this.props.groupStage.map(match =>
          <div>{match.matchId}</div>
        )}
      </div>
    );
  }
}

export default EuroCup;
