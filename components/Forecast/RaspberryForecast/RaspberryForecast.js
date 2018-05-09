import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import './RaspberryForecast.css';
import axios from '../../../axios';

const forecastMessages = {
    stableWeather: 'We expect a stable weather',
    worseningWeather: 'We expect an aggravation of weather',
    rainOrStorm: 'We expect rainfall, perhaps even storm',
    cooldownweatherImprove: 'We expect gentle drop of temperature with improving weather',
    cooldownslightly: 'We expect gentle drop of temperature',
    warmupweatherWorsening: 'We expect rise of temperature with an aggravation of weather',
    warmup: 'We expect rise of temperature',
    hotday: 'Today is going to be hot day',
    stormChance: 'Likelihood of storm',
    stormCertainty: 'High chance of storm',
    nightFrost: 'Danger of night freezing temperatures'
};
const forecastIcons = {
    stableWeather: <span className="icon-clear-day"></span>,
    worseningWeather: <i class="fas fa-cloud"></i>,
    rainOrStorm: <span className="icon-rain"></span>,
    cooldownweatherImprove: <div><i class="far fa-sun"></i><i class="fas fa-thermometer-empty"></i><i class="fas fa-level-down-alt"></i></div>,
    cooldownslightly: <div><i class="fas fa-thermometer-empty"></i><i class="fas fa-level-down-alt"></i></div>,
    warmupweatherWorsening: <div><i class="fas fa-thermometer-empty"><i class="fas fa-level-up-alt"></i></i><i class="fas fa-cloud"></i></div>,
    warmup: <div><i class="fas fa-thermometer-empty"></i><i class="fas fa-level-up-alt"></i></div>,
    hotday: <i class="fas fa-fire"></i>,
    stormChance: <div><i class="fas fa-bolt"></i><i class="fas fa-cloud"></i></div>,
    stormCertainty: <div><i class="fas fa-exclamation-triangle"></i><i class="fas fa-bolt"></i></div>,
    nightFrost: <i class="fas fa-snowflake"></i>
}
const forecastInfo = {
    stableWeather: 'Trend of measured datas of air pressure is increasing on the long term basis or is constant',
    worseningWeather: 'In consequence of the fact that the air pressure has decreased under 1000 hPa, we expect an aggravation of weather',
    rainOrStorm: 'Trend of measured datas of air pressure is decreasing on the long-term basis or is moving around 1013,3 hPa',
    cooldownweatherImprove: 'The air pressure is increasing in long-term basis and the denomination of dew point is decreasing for last 24 hours',
    cooldownslightly: 'The dew point is decreasing for last 24 hours and the air pressure is descreasing for long-term basis',
    warmupweatherWorsening: 'The denomination of dew point was increased for last 24 hours and the pressure is decreasing for long-term basis',
    warmup: 'The air pressure is increasing in long-term basis and the denomination of dew point is increasing for last 24 hours.',
    hotday: 'The temperature in morning got over 20 °C limit',
    stormChance: 'Chance for storm',
    stormCertainty: 'The denomination of dew point has increased about 6 °C for last 12 hours',
    nightFrost: 'The dew point has decreased below 0 °C'
}



class RaspberryForecast extends Component {
    state = {
        forecastData : null,
        error: false,
    }
    
    componentDidMount() {
        axios.get('/forecast/raspberryforecast')
            .then(response => {   
                if(!response.data.status) {
                    this.setState({error:true});
                }
                else {
                    this.setState({forecastData:response.data.forecastInfo});
                }
            })
            .catch(err => {
                this.setState({error:true});    
            }) 
    }
    
    
    render() {
        let forecastElements = [];
        if(this.state.forecastData) {
            const data = this.state.forecastData;
            Object.keys(data).map(key => {
                let forecastTypeObj = data[key];
                return Object.keys(forecastTypeObj).forEach(infokey => {  
                    if(forecastTypeObj[infokey]) {
                        let icon;
                        switch(key){
                            case 'press':
                                icon = <i className="fas fa-tachometer-alt"></i>;
                                break;
                            case 'dp_press':
                                icon = <div><i className="fa fa-tint" aria-hidden="true"></i><i className="fas fa-tachometer-alt"></i></div>;
                                break;
                            case 'temp':
                                icon = <i className="fas fa-thermometer-empty"></i>;
                                break;
                            case 'dp_temp':
                                icon = <div><i className="material-icons">invert_colors</i><i className="fas fa-thermometer-empty"></i></div>;
                                break;
                            default:
                                icon = <i></i>;    
                        }
                        return forecastElements.push(
                            <div className="forecast-el" key={infokey}>
                                <div className="forecast-infoicon">
                                    {forecastIcons[infokey]}
                                </div>
                                <div className="forecast-details">
                                    <div className="forecast-el-icons">
                                        {icon}
                                    </div>
                                    <div className="forecast-message"> 
                                        <span>{forecastMessages[infokey]} </span>   
                                    </div>
                                    <div className="forecast-info">
                                        <span>{forecastInfo[infokey]} </span>
                                    </div>
                                </div>
                            </div>
                        )    
                    }                   
                })                
            })
        }
        
        return (
            <div className="raspberry-forecast">
                <span style={{fontSize:'18px'}}>This forecast is evaluating on ThingSpeak cloud with timecontroled analyse from last 24 hours meteo data</span>
                <br/>
                <span style={{fontSize:'16px'}}>This forecast is valid short time period 12-24 hours</span>
                {this.state.forecastData ? forecastElements : <Spinner />}
                {this.state.error ? <span>Error by making forecast</span> : null}
            </div>
        )
    }
}

export default RaspberryForecast;