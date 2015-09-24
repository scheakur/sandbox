import React from 'react';
import {TransitionSpring} from 'react-motion';

export default class Demo2 extends React.Component {
  constructor() {
    super();
    this.state = {
      blocks: {
        a: 'I am a',
        b: 'I am b',
        c: 'I am c',
      },
    };
  }

  getEndValue() {
    let blocks = this.state.blocks;
    let configs = {};
    Object.keys(blocks).forEach((key) => {
      configs[key] = {
        height: {
          val: 50
        },
        width: {
          val: 200
        },
        opacity: {
          val: 1
        },
        text: blocks[key], // interpolate the above 2 fields only
      };
    });
    return configs;
  }

  willEnter(key) {
    return {
      height: {
        val: 50
      },
      width: {
        val: 200
      },
      opacity: {
        val: 1
      },
      text: this.state.blocks[key],
    };
  }

  willLeave(key, value, endValue, currentValue, currentSpeed) {
    // the key with this value is truly killed when the values reaches destination
    return {
      height: {
        val: 0
      },
      width: {
        val: 1000
      },
      opacity: {
        val: 0
      },
      text: currentValue[key].text,
    };
  }

  handleClick(key) {
    let {...newBlocks} = this.state.blocks;
    delete newBlocks[key];
    this.setState({blocks: newBlocks});
  }

  render() {
    return (
      <TransitionSpring
        endValue={this.getEndValue()}
        willEnter={this.willEnter.bind(this)}
        willLeave={this.willLeave.bind(this)}>
        {currentValue =>
          <div>
            {Object.keys(currentValue).map((key) => {
              let style = {
                backgroundColor: '#aaa',
                lineHeight: currentValue[key].height.val + 'px',
                height: currentValue[key].height.val,
                width: currentValue[key].width.val,
                opacity: currentValue[key].opacity.val,
              };
              return (
                <div onClick={this.handleClick.bind(this, key)} style={style}>
                  {currentValue[key].text}
                </div>
              );
            })}
          </div>
        }
      </TransitionSpring>
    );
  }

}
