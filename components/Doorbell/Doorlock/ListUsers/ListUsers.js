import React,{Component} from 'react';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from '../../../../axios';
import ShowUser from './ShowUser/ShowUser';
import './ListUsers.css';


class ListUsers extends Component {
    state = {
        loading : false,
        errorByLoadingUsers : false,
        errorByDeletingUser : null,
        users : [],
        showUser: false,
        showUserID : '',
        showUserImg: '',
    }
    
    componentDidMount() {
        this.setState({loading:true});
        axios.get('/users/getallusers')
            .then(response => {
                if(!response.data.status) {
                    this.setState({loading:false,errorByLoadingUsers:true});
                }
                else {
                    this.setState({loading:false,users:response.data.users});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false,errorByLoadingUsers:true});
            })
    };

    reloadData = () => {
        axios.get('/users/getallusers')
            .then(response => {
                if(!response.data.status) {
                    this.setState({loading:false,errorByLoadingUsers:true});
                }
                else {
                    this.setState({loading:false,users:response.data.users});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false,errorByLoadingUsers:true});
            })
    }
    showUser = (id) => {
        this.setState({showUser:true,showUserID:id,showUserImg:''});
        axios.post('/users/showuser',{userID:id})
            .then(response => {
                if(!response.data.status) {
                    console.log('Error');
                }
                else {
                    this.setState({showUser:true,showUserID:id,showUserImg:response.data.imgBase64});      
                }
            })
            .catch(error => {
                console.log(error);    
            })
    }
    deleteUser = (id) => {
        axios.post('/users/deleteuser',{id:id})
            .then(response => {
                if(!response.data.status) {
                    console.log('Error');
                }
                else {
                    this.reloadData();
                    alert('You deleted user with id: ' +id)  
                }
            })
            .catch(error => {
                console.log(error);
            })
    };
    
    render() {
        let users = <Spinner />
        if(!this.state.loading && this.state.users) {
            users = this.state.users.map(user => {
                return(
                    <div key={user.id} className="userinfo">
                        <div className="user">
                            <span>{user.id}</span>
                            <span>{user.name}</span>
                            <span>{user.unlock_rights}</span>
                            <span>{user.last_unlock}</span>
                            <span>
                                <i onClick={() => this.showUser(user.id)} className="material-icons">info_outline</i>
                                <i onClick={() => this.deleteUser(user.id)} className="material-icons">delete_forever</i>
                            </span>
                        </div>
                        {(this.state.showUser && this.state.showUserID === user.id) ? 
                        <ShowUser imgSrc={this.state.showUserImg} user={{username:user.name,unlock_rights:user.unlock_rights,last_unlock:user.last_unlock}} /> : null}    
                    </div>
                    
                );
            })
        }
        
        return(
            <div>
                <div className="users-header">
                    <span>User's ID</span>
                    <span>Name</span>
                    <span>Unlock Rights</span>
                    <span>Last Unlock</span>
                    <span>Click to info/delete</span>
                </div>
                <div className="users">
                    {users}
                </div>
            </div>
        );
    }
}

export default ListUsers;