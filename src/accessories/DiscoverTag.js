import React from 'react';
import './DiscoverTag.css';

function DiscoverTag(props) {
    return(
        <div className="discoverTag">
            <props.icon fontSize="small"/>
            <p>{props.tag}</p>
        </div>
    );
}

export default DiscoverTag;