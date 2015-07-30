import React from 'react';
import Router from 'react-router';
import Routes from './routes.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

window.addEventListener('DOMContentLoaded', () => {
  Router.run(Routes, (Handler) => {
    React.render(<Handler/>, document.body);
  });
});
