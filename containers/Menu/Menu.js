import React ,{Component} from 'react';
import Aux from '../../hoc/Aux';
import {NavLink} from 'react-router-dom';
import './Menu.css';
import Logo from '../../components/Logo/Logo';




class Layout extends Component {
    render(){
        return(
            <Aux>
                    <div className="Menu">
                        <NavLink to="/" exact><Logo /></NavLink>     
                        <ul>
                            <li><NavLink to="/doorbell" exact>DOORBELL</NavLink>
                            </li>
                            <li><NavLink to="/forecast" exact>WEATHER FORECAST</NavLink></li>
                            <li><NavLink to="/sensors" exact>SENSORS</NavLink></li>      
                        </ul>              
                    </div>
                    <main className="Main">
                        {this.props.children}
                    </main>    
            </Aux>     
        );
    }
};

export default Layout;