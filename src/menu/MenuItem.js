import React from 'react';
import './MenuItem.css';


function MenuItem(props) {
    return(
        <div className={`menuItem ${props.selected && "selected"}`} onClick={props.onClick}>
            <props.icon fontSize="large" className="menuItem__icon"/>
            <h2>{props.title}</h2>
        </div>
    );
}

export default MenuItem;