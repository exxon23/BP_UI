import React from 'react';
import {Route,NavLink} from 'react-router-dom';
import Darksky from './Darksky/Darksky';
import RaspberryForecast from './RaspberryForecast/RaspberryForecast';
import Aux from '../../hoc/Aux';
import './Forecast.css';

const forecast = (props) => {
    return (
        <Aux>
            <div className="forecast-menu">
                <ul>
                    <NavLink className="forecast-nav-a" to="/forecast/darkskyforecast" exact><button className="forecast-nav-btn">DARKSKY FORECAST</button></NavLink>
                    <NavLink className="forecast-nav-a" to="/forecast/raspforecast" exact><button className="forecast-nav-btn">RASPBERRY FORECAST</button></NavLink>
                    
                </ul>
            </div>
            <Route exact path="/forecast/darkskyforecast" component={Darksky} />
            <Route exact path="/forecast/raspforecast" component={RaspberryForecast} />
        </Aux>
    )};

export default forecast;