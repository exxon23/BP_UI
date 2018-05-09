import React,{Component} from 'react';
import {Route,NavLink} from 'react-router-dom';
import './Doorlock.css';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import AddUser from './AddUser/AddUser';
import Aux from '../../../hoc/Aux';
import ListUsers from './ListUsers/ListUsers';
import LastAnalyse from './LastAnalyse/LastAnalyse';


class Doorlock extends Component {
    state = {
        error: false,
        loading:false,
        base64Src: null
    }
    
    componentDidMount() {
        const ws = new WebSocket('ws://192.168.1.4:5000/lastanalyse');   
        this.ws = ws;
        let that = this;
        ws.onmessage = function (event) {
            console.log(event.data)
            if(event.data === 'last_analyse_changed'){
                that.loadLastAnalysePhoto();
            }
        };  
        this.loadLastAnalysePhoto();    
    }
    componentWillUnmount() {
        this.ws.close();
    }

    loadLastAnalysePhoto = () => {
        axios.get('/doorbell/lastanalyse')
            .then(response => {
                if(!response.data.status) {
                    this.setState({error:true});
                }
                else {
                    this.setState({base64Src:response.data.imgBase64});
                }
            })
            .catch(error => {
                this.setState({error:true});
            })
    }
    
    render(){
        
        let last_a = <Spinner />;
        if(this.state.base64Src) {
            last_a = (<Route exact path="/doorbell/doorlock"  render={() => <LastAnalyse base64Src={this.state.base64Src}/>} />)
        }
        return(
            <Aux>
                <div className="doorlock-menu">
                    <ul>
                        <NavLink className="doorlock-nav-a" to="/doorbell/doorlock/listofusers" exact><button className="doorlock-nav-btn">LIST OF USERS</button></NavLink>
                        <NavLink className="doorlock-nav-a" to="/doorbell/doorlock/adduser" exact><button className="doorlock-nav-btn">ADD USER</button></NavLink>   
                    </ul>
                </div>
                <Route exact path="/doorbell/doorlock/adduser" component={AddUser} />
                <Route exact path="/doorbell/doorlock/listofusers" component={ListUsers} />
                {last_a}
                
            </Aux>
        );
    }
        
    
}

export default Doorlock;