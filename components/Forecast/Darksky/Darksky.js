import React, { Component } from 'react';
import axios from '../../../axios';
import Aux from '../../../hoc/Aux';
import Spinner from '../../UI/Spinner/Spinner';
import moment from 'moment';

import './Darksky.css';

class Darksky extends Component {
    state = {
        weatherInfo:null,
        loading: true,
        error: false       
    }
    
    componentDidMount() {
        axios.get('/forecast/darkskyforecast')
            .then(response => {   
                if(!response.data.status) {
                    this.setState({error:true});
                }
                else {
                    this.setState({weatherInfo:response.data.weatherInfo, loading:false});
                }
            })
            .catch(err => {
                this.setState({error:true});
            });
    }
    
    
    render() {
        let actualData = <Spinner />;
        let hoursForecast = null;
        let daysForecast = null;
        
        if(!this.state.loading && !this.state.error) {
            actualData = (
                <Aux>
                    <div className="actual-temp">
                        <span className="bigtemp">{Math.round(this.state.weatherInfo.currently.temperature)}
                            <span className="degree">°</span>
                        </span> 
                        <span>{`Feels like: ${Math.round(this.state.weatherInfo.currently.apparentTemperature)}°`}</span>
                    </div>
    
                    <div>
                        <ul className="actual-meteo-data">
                            <li>
                                <i className="material-icons">toys</i>
                                <span>{`${this.state.weatherInfo.currently.windSpeed} m/s`}</span>                            
                            </li>
                            <li>
                                <i className="material-icons">invert_colors</i>
                                <span>{`${this.state.weatherInfo.currently.humidity*100} %`}</span>
                            </li>
                            <li>
                                <i className="fas fa-tachometer-alt"></i>
                                <span>{`${Math.round(this.state.weatherInfo.currently.pressure)} hPa`}</span>
                            </li> 
                        </ul>
                    </div>
                </Aux>
            );

            hoursForecast = this.state.weatherInfo.hourly.map( forecast => {
                return(
                    <div key={forecast.time} className="hour-forecast">
                        <span className="hour-forecast-time">{`${new Date(forecast.time*1000).getHours()}:00`}</span>
                        <span className="hour-forecast-icon"><span className={`icon-${forecast.icon}`}></span></span>
                        <span className="hour-forecast-degree">{`${Math.round(forecast.temperature)}°`}</span>
                    </div>
                )
            });

            daysForecast = this.state.weatherInfo.daily.map(forecast => {
                return(
                    <div key={forecast.time} className="day-forecast">
                        <span className="day-forecast-time">{`${moment.unix(forecast.time).format("ddd, DD.MM")}`}</span>
                        <span className="day-forecast-icon"><span className={`icon-${forecast.icon}`}></span></span>
                        <span className="day-forecast-degree">{`${Math.round(forecast.temperatureHigh)}° / ${Math.round(forecast.temperatureLow)}°`}</span> 
                    </div>
                )
            });
        }
        

        return (          
            <div className="darkskyForecast">
                <div className="position">
                        <i className="material-icons">room</i>
                        <span>VUT BRNO</span>
                </div>
                {actualData}
                <hr />
                <span className="forecast-heading">NEXT 24 HOURS</span>
                <div className="hours-forecast">
                    {hoursForecast}
                </div>
                <br/>
                <span className="forecast-heading">NEXT 5 DAYS</span>
                <div className="days-forecast">
                    {daysForecast}
                </div>
                
            </div>
        )
    }
}

export default Darksky;