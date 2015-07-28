var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
        <div>
          <header>header</header>
          <section><RouteHandler/></section>
          <footer>footer</footer>
        </div>
    );
  }
});

var Foo = React.createClass({
  render: function() {
    return <div>foo</div>;
  }
});

var Bar = React.createClass({
  render: function() {
    return <div>bar</div>;
  }
});

var Routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Foo}/>
    <Route name="foo" path="/foo" handler={Foo} />
    <Route name="bar" path="/bar" handler={Bar} />
  </Route>
);

module.exports = Routes;
