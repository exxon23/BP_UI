import React from 'react';
import SmallSpinner from '../../../../UI/SmallSpinner/SmallSpinner';
import './ShowUser.css';


const showUser = (props) => (
    
    <div className="show-user">
        {props.imgSrc ? <img src={props.imgSrc} alt="user" /> : <div className="empty-div"><SmallSpinner/></div> }
        <div className="user-details">    
            <span className="user-details-heading">Name:</span>
            <span style={{width:'300px',margin:'0 10px'}}>{props.user.username}</span>
            <span className="user-details-heading">Unlock rights:</span>
            <span style={{width:'100px',margin:'0 10px'}}>
                {props.user.unlock_rights ? <i className="material-icons">check_circle</i> : <i className="material-icons">highlight_off</i>}
            </span>
            <span className="user-details-heading">Last unlock:</span>
            <span style={{width:'300px',margin:'0 10px'}}>{props.user.last_unlock}</span>
        </div>
    </div>
);

export default showUser;