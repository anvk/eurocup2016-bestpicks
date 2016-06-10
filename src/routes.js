import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, EuroCupContainer } from './containers';
import { Home, NotFoundPage, Rules } from './components';

export default (
  <Route path="/euro2016" component={App} >
    <IndexRoute component={EuroCupContainer} />
    <Route path="rules" component={Rules} />
    <Route status={404} path="*" component={NotFoundPage} />
  </Route>
);
