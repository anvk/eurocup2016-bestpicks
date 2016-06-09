import React, { Component } from 'react';
import { pot1, pot2, pot3, pot4 } from '../../constants/pots.js';

import { Pot } from '../';

class Pots extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Pot data={pot1} label="Pot 1" />
        </div>
        <div className="col-md-3">
          <Pot data={pot2} label="Pot 2" />
        </div>
        <div className="col-md-3">
          <Pot data={pot3} label="Pot 3" />
        </div>
        <div className="col-md-3">
          <Pot data={pot4} label="Pot 4" />
        </div>
      </div>
    );
  }
}

export default Pots;
