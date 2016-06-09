import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

import './app.less';

import React, { Component } from 'react';
import { HeaderContainer } from '../';
import { Footer, GitHubRibbon } from '../../components';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />

        <div className="container">
          <div className="col-md-12">{this.props.children}</div>
        </div>

        <Footer />

        <GitHubRibbon />
      </div>
    );
  }
}

export default App;
