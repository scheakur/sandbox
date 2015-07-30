import React from 'react';
import {DefaultRoute, Route, RouteHandler} from 'react-router';

class App extends React.Component {
  render() {
    return (
        <div>
          <header>header</header>
          <section><RouteHandler/></section>
          <footer>footer</footer>
        </div>
    );
  }
}


class Foo extends React.Component {
  render() {
    return <div>foo</div>;
  }
}


class Bar extends React.Component {
  render() {
    return <div>bar</div>;
  }
}


let Routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Foo}/>
    <Route name="foo" path="/foo" handler={Foo} />
    <Route name="bar" path="/bar" handler={Bar} />
  </Route>
);


export default Routes;
