import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      morphDocTree: {},
      morphDocHtml: '',
    };
  }

  componentDidMount() {
    window.addEventListener('message', event => {
      const message = event.data;
      this.setState(message);
    });
  }

  render() {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.morphDocHtml }}
          style={
            { 
              width: '100%',
              height: 400,
              border: '2px solid black',
            }
          }
        />
        <JSONPretty id="json-pretty" json={this.state.morphDocTree}></JSONPretty>
      </div>
    );
  }
}
 
export default Main;