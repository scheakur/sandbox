import React from 'react';
import {DefaultRoute, Route} from 'react-router';
import Root from './components/root.jsx';
import Foo from './components/foo.jsx';
import Bar from './components/bar.jsx';

export default (
  <Route name="app" path="/" handler={Root}>
    <DefaultRoute handler={Foo}/>
    <Route name="foo" path="/foo" handler={Foo} />
    <Route name="bar" path="/bar" handler={Bar} />
  </Route>
);
