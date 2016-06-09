import './footer.less';

import React, { Component } from 'react';
import { author } from '../../../package.json';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">
            {'made with love by '}
            <a href="https://github.com/anvk">
              <strong>@{author}</strong>
            </a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
