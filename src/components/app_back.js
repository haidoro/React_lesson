// import React from 'react';
//
// function App(props){
//   return (<div>Hello from function App</div>);
// }
//
// export default App;

import React, { Component } from 'react';

import Greeting from './greeting';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bob',
    };
  }

  handleMouseOver() {
    this.setState({ name: 'Bob' });
  }

  handleMouseOut() {
    this.setState({ name: 'Mike' });
  }

  render() {
    return (
      <div
        onMouseOver={() => this.handleMouseOver()}
        onMouseOut={() => this.handleMouseOut()}
      >
        <Greeting name={this.state.name} />
      </div>
    );
  }
}


export default App;
