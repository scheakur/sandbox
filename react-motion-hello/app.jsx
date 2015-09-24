import React from 'react';
import {Spring} from 'react-motion';
import Demo1 from './demo1.jsx'
import Demo2 from './demo2.jsx'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Demo1/>
        <Demo2/>
      </div>
    );
  }

}
