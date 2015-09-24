import React from 'react';
import {Spring} from 'react-motion';

export default class Demo1 extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleMouseDown() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div>
        <button onMouseDown={this.handleMouseDown.bind(this)}>Toggle</button>
        <Spring defaultValue={{val: 0}} endValue={{val: this.state.open ? 400 : 0}}>
          {interpolated =>
            <div className="demo0-block" style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'red',
              transform: `translate3d(${interpolated.val}px, 0, 0)`,
            }} />
          }
        </Spring>
      </div>
    );
  }

}

