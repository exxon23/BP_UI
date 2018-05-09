import React, { Component } from 'react';
import {Route,NavLink} from 'react-router-dom';
import Snapshot from './Snapshot/Snapshot'
import axios from '../../axios';
import Stream from './Stream/Stream';
import Doorlock from './Doorlock/Doorlock';
import './Doorbell.css';



class Doorbell extends Component {
       
    stopStream = () => {
        const url = '/doorbell/stopstream';
        console.log('Aborting stream!');
        axios.get(url)
        .then(response => {
            if(response.data.status) {
                this.setState({showStream:false,loading:false,streamRunning:false});
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({streamRunning:true,showStream:true});
        });
    }

    startStream = () => {
        this.setState({loading:true,showStream:false,showSnapshot:false, ringing: false});
        const url = '/doorbell/startstream';
        console.log('Starting stream!');
        axios.get(url)
            .then(response => {
                this.setState({streamRunning:response.data.status});
                console.log('Stream is on: ',response.data.status);
                if(response.data.status) {
                    this.setState({showStream:true,loading:false});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({streamRunning:false});
            });
    }
    declineStream = () => {
        this.setState({ringing:false});
    }

    
   
    
    render() {     
       
        return(
            <div>
                <div className="doorbell-buttons">
                    <div className="doorbell-button">
                        <NavLink to="/doorbell/videostream" exact><button className="start-stream-btn"><i className="material-icons">videocam</i></button></NavLink>
                        <span>Security Cam</span>
                    </div>
                    <div className="doorbell-button">
                        <NavLink to="/doorbell/photo" exact onClick={this.takePhoto}><button className="snapshot-btn"><i className="material-icons">photo_camera</i></button></NavLink>
                        <span>Photo</span>
                    </div>
                    <div className="doorbell-button">    
                        <NavLink to="/doorbell/doorlock" exact><button className="snapshot-btn"><i className="material-icons">lock_open</i></button></NavLink>
                        <span>Door Lock</span>
                    </div>
                </div>
                <Route path="/doorbell/doorlock" component={Doorlock} />
                <Route path="/doorbell/videostream" component={Stream} />
                <Route path="/doorbell/photo" component={Snapshot}/> 
            </div>
        )
    }
};

export default Doorbell;