import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Menu from './containers/Menu/Menu';
import Doorbell from './components/Doorbell/Doorbell';
import Forecast from './components/Forecast/Forecast';
import Sensor from './components/Sensors/Sensor';
import StreamCall from './components/Doorbell/StreamCall/StreamCall';


class App extends Component {
  state = {
    ringing: false,   
  }

  closeStreamRequest = () => {
    this.setState({ringing:false});
  }
    
  componentWillMount () {
    const ws = new WebSocket('ws://192.168.1.4:5000/stream');   
    let that = this;
    ws.onmessage = function (event) {
        console.log(event.data)
        if(event.data === 'btn_hold'){
          that.setState({ringing:true});
        }
    };    
  }
  
  
  render() {
    return (     
          <div>
            <Menu>          
                <Route path="/doorbell" component={Doorbell} />
                <Route path="/forecast" component={Forecast} />
                <Route path="/sensors" component={Sensor} />            
            </Menu>
            {this.state.ringing ? <StreamCall closeStreamRequest={this.closeStreamRequest} /> : null}        
          </div>      
    );
  }
}

export default App;
