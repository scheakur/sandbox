import React from 'react';
import {RouteHandler} from 'react-router';

export default class App extends React.Component {
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
