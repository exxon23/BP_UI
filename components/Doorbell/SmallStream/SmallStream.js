import React ,{Component} from 'react';
import axios from '../../../axios';
import './SmallStream.css';

class SmallStream extends Component {
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
                <div className="small-stream">
                    <img                    
                    className="small-stream-src"
                    src={this.state.streamURL} 
                    alt="RaspCamStream" />     
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
    
export default SmallStream;


