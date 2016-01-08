import React from 'react';
import {Flux, Component} from 'flumpt';
import {render} from 'react-dom';

class Hello extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Hello</h1>
        <div>count: {this.props.count}</div>
        <div>
          <button onClick={() => this.dispatch('++')}>++</button>
          <button onClick={() => this.dispatch('--')}>--</button>
          <button onClick={() => this.dispatch('-10')}>-10</button>
          <button onClick={() => this.dispatch('x2')}>x2</button>
          <button onClick={() => this.dispatch('x100')}>x100</button>
          <button onClick={() => this.dispatch('reset')}>reset</button>
        </div>
      </div>
    );
  }

}


const INITIAL_STATE = Object.freeze({
  count: 0,
});

class App extends Flux {
  subscribe() {
    this.on('++', this.increase.bind(this, 1));
    this.on('--', this.decrease.bind(this, 1));
    this.on('-10', this.decrease.bind(this, 10));
    this.on('x2', this.multiply.bind(this, 2));
    this.on('x100', this.multiply.bind(this, 100));
    this.on('reset', () => this.update(() => INITIAL_STATE));
  }

  increase(n) {
    this.update((state) => {
      return Object.assign({}, state, {
        count: state.count + n,
      });
    });
  }

  decrease(n) {
    this.update((state) => {
      return Object.assign({}, state, {
        count: state.count - n,
      });
    });
  }

  multiply(n) {
    this.update((state) => {
      return Object.assign({}, state, {
        count: state.count * n,
      });
    });
  }

  render(state = {}) {
    return (
      <Hello {...state}/>
    );
  }
}


function logger(state) {
  console.log(state);
  return state;
}

export default new App({
  initialState: INITIAL_STATE,

  renderer: (el) => {
    render(el, document.querySelector('.main'));
  },

  middlewares: [logger],
});
