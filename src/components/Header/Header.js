import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    const {
      tabLocation,
      onNavigate
    } = this.props;

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#project-navbar-collapse"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">EuroCup 2016</a>
          </div>

          <div id="project-navbar-collapse" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li role="presentation" className={tabLocation === 'home' ? 'active' : ''}>
                <a href="/" onClick={onNavigate('home', '/')}>Best Picks</a>
              </li>
              <li role="presentation" className={tabLocation === 'rules' ? 'active' : ''}>
                <a href="/rules" onClick={onNavigate('rules')}>Rules</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  tabLocation: PropTypes.string,
  onNavigate: PropTypes.func.isRequired
};

export default Header;
