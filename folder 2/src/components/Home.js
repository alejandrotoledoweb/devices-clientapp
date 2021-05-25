import React, { Component } from 'react'
import '../styles/App.css';

import Devices from './Devices';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { devices:[], filteredDevices:[]}
  }
  componentWillUnmount(){
    fetch("http://localhost:3000/devices").then(response => response.json())
    .then(data => this.setState({
      devices: data,
      filteredDevices: data
    }));
  }

  render() {
    return (
      <div>
        
        <Devices devices={this.state.filteredDevices} />
        
      </div>
    );
  }
}

export default Home;
                  
