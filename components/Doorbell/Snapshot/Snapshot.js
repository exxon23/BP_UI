import React,{Component} from 'react';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import './Snapshot.css';

class Snapshot extends Component {
    state = {
        imgSrc: '',
        error: false
    }
    
    componentWillMount() {
        console.log('Taking snapshot!');
        axios.get('/doorbell/takephoto', { responseType:"blob" })
            .then(response => {
                
                var reader = new window.FileReader();
                reader.readAsDataURL(response.data); 
                reader.onload = () =>
                this.setState({imgSrc:reader.result});                   
                
            })
            .catch(error => {
                this.setState({error:true});
            })
    }
    
    render() {
        let snapShot = <Spinner />;
        if(this.state.imgSrc) {
            snapShot = (
                <img                    
                    className="snapshot"
                    src={this.state.imgSrc} 
                    alt="RaspCamPhoto" 
                /> 
            )
        }
        if(this.state.error) {
            snapShot = (
                <span className="snapshot">Error by making snapshop</span>
            )
        }
        return(
            <div>
                {snapShot}
            </div>    
        );
    }    
}

export default Snapshot;

