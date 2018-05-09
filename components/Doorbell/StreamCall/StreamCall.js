import React from 'react';
import {NavLink} from 'react-router-dom';
import './StreamCall.css';

const streamCall = (props) => (
    <div className="streamCall">
        <span style={{backgroundColor:'#FAFAFA'}}>SOMEONE IS RINGING</span>
        <br />
            <div className="streamCall-btns">      
                <NavLink to="/doorbell/videostream" exact onClick={props.closeStreamRequest}><button  className="accept-stream"><i className="material-icons">call</i></button></NavLink>
                <button className="decline-stream" onClick={props.closeStreamRequest}><i className="material-icons">call_end</i></button>
            </div>    
    </div>
)

export default streamCall;