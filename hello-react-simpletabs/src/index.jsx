import React from 'react';
import { render } from 'react-dom';
import Tabs from 'react-simpletabs';

class App extends React.Component {

  render() {
    return (
      <Tabs>
        <Tabs.Panel title='Tab #1'>
          <h2>Content #1 here</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #2'>
          <h2>Content #2 here</h2>
        </Tabs.Panel>
        <Tabs.Panel title='Tab #3'>
          <h2>Content #3 here</h2>
        </Tabs.Panel>
      </Tabs>
    );
  }

}

render(<App/>, document.querySelector('.main'));
