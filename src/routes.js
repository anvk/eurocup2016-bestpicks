import React from 'react';
import { Route } from 'react-router';

import { App, EuroCupContainer } from './containers';
import { Home, NotFoundPage, Rules } from './components';

export default (
  <Route path="/" component={App} >
    <Route path="home" component={EuroCupContainer} />
    <Route path="rules" component={Rules} />
    <Route status={404} path="*" component={NotFoundPage} />
  </Route>
);
