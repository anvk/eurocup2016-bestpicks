import React, { Component } from 'react';

class Rules extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="page-header">
          <h1>Rules</h1>
        </div>
        <div>
          <h2>PLAYOFF SELECTION (Bracket Selections)</h2>
          <p>
            You are required to select the 16 teams that make it to the round of sixteen, the 8 teams that will be in the quarter finals, the 4 teams in the semi finals, the 2 finalists, and the winner of the tournament.
          </p>

          <h2>POINTS</h2>
          <p>Points are awarded using the following scheme:</p>
          <ul>
            <li>
              POT Teams: You will be awarded 3 points for each win, and 1 point for a draw by your teams. Also 1 point is awarded for each goal scored by your team.
            </li>
            <li>
              Playoff Selections: Additional points are awarded for the correct selection of teams for the playoff rounds.
              <ul>
                <li>2 points for each team in the round of sixteen</li>
                <li>3 points for each quarter-finalist</li>
                <li>5 for each semi-finalist</li>
                <li>8 for each finalist</li>
                <li>10 points for Champion</li>
              </ul>
            </li>
            <li>
              For games decided by a penalty shootout, the result of the shoot-out will count as a single goal for the winning team.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Rules;
