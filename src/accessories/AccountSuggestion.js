import React from 'react';
import './AccountSuggestion.css';
import Avatar from '@material-ui/core/Avatar';

function AccountSuggestion(props) {

    return (
        <div className="accountSuggestion">
            <Avatar src={props.img ? props.img : ""}/>
            {(!props.name || !props.title) ? (
                <div className="accountSuggestion__info">
                    <div className="accountSuggestion__title"></div>
                    <div className="accountSuggestion__name"></div>
                </div>
            ):(
                <div className="accountSuggestion__info">
                    <h4>{props.title}</h4>
                    <p>{props.name}</p>
                </div>
            )}
            
        </div>
    )
}


export default AccountSuggestion;