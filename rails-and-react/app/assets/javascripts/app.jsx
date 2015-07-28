(function() {
  var React = require('react');
  window.React = React;

  var injectTapEventPlugin  = require('react-tap-event-plugin');
  injectTapEventPlugin();

  var Router = require('react-router');
  var Routes = require('./routes.jsx');

  $(function() {
    Router.run(Routes, function(Handler) {
      React.render(<Handler/>, document.body);
    });
  });
})();
