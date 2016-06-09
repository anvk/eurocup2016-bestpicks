import React, { Component } from 'react';
import * as euroCupActions from '../../actions/euroCupActions.js';
import { connect } from 'react-redux';
import {
  EuroCup,
  GroupStage,
  SelectStage,
  TeamPoints,
  BestPicks,
  Pot
} from '../../components';

import {
  MATCH_GROUPSTAGE,
  MATCH_ROUNDOF16,
  MATCH_QUARTERFINALS,
  MATCH_SEMIFINALS,
  MATCH_FINALS,
  sortByPoints
} from '../../reducers/euroCup.js';

class EuroCupContainer extends Component {
  render() {
    const {
      changeValue
    } = this.props;

    return (
      <div>
        <h1>EuroCup 2016</h1>

        <div className="row">
          <div className="col-md-12">
            <button type="button"
              className="btn btn-primary"
              onClick={this.props.reset}
              aria-hidden="true"
              data-toggle="tooltip"
              data-placement="top"
              title="Add A Vendor"
            >
              <span className="glyphicon glyphicon-repeat"></span> Reset
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <Pot data={this.props.pot1} label="Pot 1" />
          </div>
          <div className="col-md-3">
            <Pot data={this.props.pot2} label="Pot 2" />
          </div>
          <div className="col-md-3">
            <Pot data={this.props.pot3} label="Pot 3" />
          </div>
          <div className="col-md-3">
            <Pot data={this.props.pot4} label="Pot 4" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <GroupStage
              data={this.props.groupStage}
              onChange={(matchId, name, value) => {
                changeValue(MATCH_GROUPSTAGE, matchId, name, value);
              }}
            />
          </div>
          <div className="col-md-4">
            <TeamPoints teams={this.props.teams} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <SelectStage
              label="Round of 16"
              data={this.props.roundOf16}
              onChange={(matchId, name, value) => {
                changeValue(MATCH_ROUNDOF16, matchId, name, value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <SelectStage
              label="Quarter Finals"
              data={this.props.quarterFinals}
              onChange={(matchId, name, value) => {
                changeValue(MATCH_QUARTERFINALS, matchId, name, value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <SelectStage
              label="Semi Finals"
              data={this.props.semiFinals}
              onChange={(matchId, name, value) => {
                changeValue(MATCH_SEMIFINALS, matchId, name, value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <SelectStage
              label="Finals"
              data={this.props.finals}
              onChange={(matchId, name, value) => {
                changeValue(MATCH_FINALS, matchId, name, value);
              }}
            />
          </div>
        </div>

        <div className="row space-below">
          <div className="col-md-12">
            <button type="button"
              className="btn btn-primary"
              onClick={this.props.reset}
              aria-hidden="true"
              data-toggle="tooltip"
              data-placement="top"
            >
              <span className="glyphicon glyphicon-repeat"></span> Reset
            </button>
          </div>
        </div>

        <div className="row space-below">
          <div className="col-md-12">
            <button type="button"
              className="btn btn-primary"
              onClick={this.props.calculate}
              aria-hidden="true"
              data-toggle="tooltip"
              data-placement="top"
            >
              <span className="glyphicon glyphicon-list-alt"></span> Calculate Best Picks
            </button>
          </div>
        </div>

        {
          this.props.bestPicks.length ?
          <div className="row">
            <div className="col-md-12">
              <BestPicks
                bestPicks={this.props.bestPicks}
              />
            </div>
          </div>
          : null
        }

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.euroCup,
    teams: state.euroCup.teams.slice().sort(sortByPoints)
  };
}

export default connect(
  mapStateToProps,
  {
    reset: euroCupActions.reset,
    calculate: euroCupActions.calculate,
    changeValue: euroCupActions.changeValue
  }
)(EuroCupContainer);
