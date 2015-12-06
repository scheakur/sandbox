var React = require('react');

var Hello = React.createClass({
  render() {
    return (
      <div className="title">Hello {this.props.name}</div>
    );
  }
})

var Counter = React.createClass({
  getInitialState() {
    return {
      count: 0
    };
  },

  countUp() {
    this.setState({
      count: this.state.count + 1
    });
  },

  render() {
    return (
      <div>
        <div>
          <span>Count: {this.state.count}</span>
          <input type="button" value="count up" onClick={this.countUp}/>
        </div>
      </div>
    );
  }
});

var Main = React.createClass({
  render() {
    return <div className="container">
      <Hello name="React"/>
      <Counter/>
    </div>
  }
})

React.render(<Main/>, document.getElementById('app'));
