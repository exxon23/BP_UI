import React , {Component} from 'react';
import axios from '../../axios';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';
import moment from 'moment';
import './Sensor.css';

class Sensor extends Component {
    state = {
        sensorData : null,
        lastMeasure: null,
        errorBME: false
    }

    componentDidMount() {
        axios.get('/sensors/bme280')
            .then(res => {
                if(!res.data.status) {
                    this.setState({errorBME:true, errorBMEMessage:'Server error'});
                }
                else {
                    this.setState({sensorData:res.data.sensorData, lastMeasure: moment(new Date()).format("HH:mm:ss DD.MMM")});
                }
            })
            .catch(err => {
                this.setState({errorBME:true,errorBMEMessage:err});
            });
    }

    MeasureData = () => {
        axios.get('/sensors/bme280')
            .then(res => {
                if(!res.data.status) {
                    this.setState({errorBME:true, errorBMEMessage:'Server error'});
                }
                else {
                    this.setState({sensorData:res.data.sensorData, lastMeasure: moment(new Date()).format("HH:mm:ss DD.MMM")});
                }
            })
            .catch(err => {
                this.setState({errorBME:true});
            });
    }
    
    render(){
        let sensorEl = <Spinner />;
        let measureReload = null;
        let errorBME = null;

        
        
        if(this.state.sensorData){
            sensorEl = 
                <Aux>
                    <div className="sensor-data-el">
                        <span className="sensor-heading">TEMPERATURE</span>
                        <span className="sensor-data"><i className="fas fa-thermometer-empty"></i><span className="sensor-value">{Math.floor(this.state.sensorData['temperature'])} °C</span></span>
                    </div>

                    <div className="sensor-data-el">
                        <span className="sensor-heading">HUMIDITY</span>
                        <span className="sensor-data"><i className="fas fa-tint"></i><span className="sensor-value">{Math.floor(this.state.sensorData['humidity'])} %</span></span>
                    </div>

                    <div className="sensor-data-el">
                        <span className="sensor-heading">AIR PRESSURE</span>
                        <span className="sensor-data"><i className="fas fa-tachometer-alt"></i><span className="sensor-value">{Math.floor(this.state.sensorData['pressure'])} hPa</span></span>
                    </div>
                </Aux>
            measureReload = 
                <div className="sensor-reload">
                    <button  className="measure-reload-btn" onClick={this.MeasureData}><i className="material-icons">refresh</i></button>
                    <span>Last measured at {this.state.lastMeasure}</span>
                </div>
        }
        if(this.state.errorBME) {
            errorBME = <div><p>Error by measuring</p></div>;
            sensorEl = null;
        }
        return(
            <Aux> 
                <div className="sensor-data-elements">
                    {errorBME}
                    {sensorEl}
                </div>
                {measureReload}
            </Aux>      
        );
    }
}

export default Sensor;