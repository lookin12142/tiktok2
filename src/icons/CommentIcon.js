import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

function CommentIcon(props) {
    return(
        <FontAwesomeIcon icon={faCommentDots} color="rgb(22, 24, 35)" size={props.size && props.size}/>  
    );
}


export default CommentIcon;