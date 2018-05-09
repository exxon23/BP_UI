import React ,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../../axios';
import './Stream.css';

class Stream extends Component {
    state = {
        streamURL: '',
        error: false
    }
    
    componentWillMount() {
        
        axios.get('/doorbell/startstream')
            .then(response => {
                if(!response.data.status) {
                    this.setState({error:true});
                }
                else {
                    this.setState({streamURL:'http://192.168.1.4:8080/stream/video.mjpeg'});
                    console.log('Starting stream!');
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({error:true});
            });
    }
    
    componentWillUnmount() {
        this.stopStream()
    }

    stopStream = () => {
        console.log('Aborting stream!');
        axios.get('/doorbell/stopstream')
            .then(response => {
                if(!response.data.status) {
                    this.setState({error:true});    
                }
                else {
                    this.setState({streamURL:'',error:false});
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({error:true});
            });
    }


    render() {
        let stream;
        if(this.state.streamURL) {
            stream = (
                <div className="stream">
                    <img                    
                    className="stream-src"
                    src={this.state.streamURL} 
                    alt="RaspCamStream" />
                    <NavLink to="/doorbell" exact><button className="stop-stream-btn"><i className="material-icons">stop</i></button></NavLink>     
                </div>
            )
        }
        
        return (
            <div>
                {stream}
            </div>
        );
    }
}
    
export default Stream;


