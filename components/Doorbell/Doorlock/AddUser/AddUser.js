import React, {Component} from 'react';
import axios from '../../../../axios';
import SmallSpinner from '../../../UI/SmallSpinner/SmallSpinner';
import SmallStream from '../../SmallStream/SmallStream';
import './AddUser.css';


class AddUser extends Component {
    state = {
        name: '',
        unlock_rights: false,
        errorSavinguser: null,
        photobox1 : {
            Base64Src: null,
            loading:  false,
            error: false,
            mouseInside: false,
        },
        photobox2 : {
            Base64Src: null,
            loading:  false,
            error: false,
            mouseInside: false,
        },
        photobox3 : {
            Base64Src: null,
            loading:  false,
            error: false,
            mouseInside: false,
        }
    }

    componentDidMount() {
        axios.get('/users/adduser')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    takeNewUserPhoto = (id) => {
        const photoboxID = `photobox${id}`;
        let actualPhotoboxState = {...this.state[photoboxID]};
        actualPhotoboxState.loading = true;
        actualPhotoboxState.mouseInside = false;
        actualPhotoboxState.error = false; 
        this.setState({[photoboxID]: actualPhotoboxState});
        
           
        axios.post('/users/takeuserphoto',{photoID:id})
            .then(response => {  
                if(!response.data.status) {
                    actualPhotoboxState.error = true; 
                    actualPhotoboxState.loading = false;   
                }
                else {
                    actualPhotoboxState.Base64Src = response.data.imgBase64;
                }
                this.setState({[photoboxID]: actualPhotoboxState});  
            })
            .catch(error => {
                console.log(error);
                actualPhotoboxState.error = true;
                actualPhotoboxState.loading = false;
                this.setState({[photoboxID]: actualPhotoboxState});
            })
    };

    cancelUserSaving = () => {
        axios.get('/users/cancelusersaving')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };
    saveUser = () => {
        if(this.state.name) {
            const newUser = {
                name:this.state.name,
                unlock_rights: this.state.unlock_rights
            }
        
            axios.post('/users/saveuser',newUser)
            .then(response => {
                if(!response.data.status) {
                    this.setState({errorSavinguser:true})
                }

                    console.log(response.data);
 
            })
            .catch(error => {
                this.setState({errorSavinguser:true})
            });
        }
        
    }
    mouseEnterListener = (id) => {
        const photoboxID = `photobox${id}`;
        let actualPhotoboxState = {...this.state[photoboxID]};
        actualPhotoboxState.mouseInside = true; 
        this.setState({[photoboxID]: actualPhotoboxState});
    }
    mouseLeaveListener = (id) => {
        const photoboxID = `photobox${id}`;
        let actualPhotoboxState = {...this.state[photoboxID]};
        actualPhotoboxState.mouseInside = false; 
        this.setState({[photoboxID]: actualPhotoboxState});
    }
    stopStreamTakePhoto = (id) => {
        console.log('called');
        this.mouseLeaveListener(id);
        this.takeNewUserPhoto(id)
    }

    render() {
        let submitCursor = 'pointer'; 
        if(!this.state.name) {
            submitCursor = 'not-allowed';
        }
        
        let emptyBox1 = 
            <div onMouseEnter={() => this.mouseEnterListener(1)} onMouseLeave={() => this.mouseLeaveListener(1)} className="empty-box">
                <div className="empty-border">
                    {this.state.photobox1.mouseInside ? <SmallStream /> : null}
                    {this.state.photobox1.loading ? <SmallSpinner /> : null}
                    {this.state.photobox1.error ? <i className="material-icons">report_problem</i> : null}
                </div>
                <button onClick={() => this.stopStreamTakePhoto(1)} className="add-user-takephoto-btn"><i className="material-icons">photo_camera</i></button>
            </div>
        let emptyBox2 = 
            <div className="empty-box">
                <div className="empty-border">
                    {this.state.photobox2.loading ? <SmallSpinner /> : null}
                    {this.state.photobox2.error ? <i className="material-icons">report_problem</i> : null}
                </div>
                <button onClick={() => this.takeNewUserPhoto(2)} className="add-user-takephoto-btn"><i className="material-icons">photo_camera</i></button>
            </div>
        let emptyBox3 = 
        <div className="empty-box">
            <div className="empty-border">
                {this.state.photobox3.loading ? <SmallSpinner /> : null}
                {this.state.photobox3.error ? <i className="material-icons">report_problem</i> : null}
            </div>
            <button onClick={() => this.takeNewUserPhoto(3)} className="add-user-takephoto-btn"><i className="material-icons">photo_camera</i></button>
        </div>
        
        if(this.state['photobox1'].Base64Src) {
            emptyBox1 = 
                <div className="empty-box">
                    <img src={this.state['photobox1'].Base64Src} alt="photo1" />
                    <button onClick={() => this.takeNewUserPhoto(1)} className="add-user-takephoto-btn"><i className="material-icons">photo_camera</i></button>
                </div> 
        }

        if(this.state['photobox2'].Base64Src) {
            emptyBox2 = 
                <div className="empty-box">
                    <img src={this.state['photobox2'].Base64Src} alt="photo2" />
                    <button onClick={() => this.takeNewUserPhoto(2)} className="add-user-takephoto-btn"><i className="material-icons">photo_camera</i></button>
                </div> 
         }
         if(this.state['photobox3'].Base64Src) {
            emptyBox3 = 
                <div className="empty-box">
                    <img src={this.state['photobox3'].Base64Src} alt="photo3" />
                    <button onClick={() => this.takeNewUserPhoto(3)} className="add-user-takephoto-btn"><i className="material-icons">photo_camera</i></button>
                </div> 
         }
        
     
        return(
            <div>
                <div className="add-user">
                    {emptyBox1}
                    {emptyBox2}
                    {emptyBox3}
                </div>
                <div className="user-info">
                    <form  onSubmit={e => console.dir(e)}>
                        <label>User's name</label>
                        <input name="username" type="text" value={this.state.name} onChange={(event) => {this.setState({name: event.target.value})}} placeholder="Enter user name..."/>

                        

                        <label>Unlock rights</label>
                        <label className="switch">
                        <input name="unlock_rights" type="checkbox" value={this.state.unlock_rights} onClick={(event) => {this.setState({unlock_rights: event.target.checked})}}/>
                        <span className="slider"></span>
                        </label>
                        <div className="user-info-btns">
                            <button style={{'cursor':submitCursor}} type="submit" onClick={this.saveUser} className="button-submit">SUBMIT</button>
                            <button onClick={this.cancelUserSaving} className="button-cancel">CANCEL</button>
                        </div>
                    </form>
                    
                </div>  
            </div>   
        )
    }    
}


export default AddUser;