import React, {useState, useEffect, useContext} from 'react';
import './Comment.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Emoji from "react-emoji-render";
import {db} from '../firebase/firebase';
import {UserContext} from '../context/Context';


function Comment(props) {

    const {user, setUser} = useContext(UserContext);
    const [likes, setLikes] = useState({});

    const handleLike = () => {
        if(props.likes.length == 0 || !props.likes.includes(user.displayName)) {
            db.collection("posts").doc(props.postId).collection("comments").doc(props.cmtId).set({
                avatar: props.avatar,
                likes: [...props.likes, user.displayName],
                comment: props.comment,
                nickname: props.nickname,
                time: props.time
            })
        }
        else {

            let index = props.likes.indexOf(user.displayName);
            let array = props.likes;
            array.splice(index, 1);

            db.collection("posts").doc(props.postId).collection("comments").doc(props.cmtId).set({
                avatar: props.avatar,
                likes: array,
                comment: props.comment,
                nickname: props.nickname,
                time: props.time
            })
        }
    }

    return (
        <div className="comment">
            <Avatar src={props.avatar}/>
            <div className="commentUser__info">
                <p className="commentUser__infoNick">{props.nickname}</p>
                <Emoji className="commentUser__infoComment" text={props.comment}/>
            </div>
            <div className="commentButton__container">
                <IconButton className="commentButton__click" size="small" onClick={handleLike}>
                    {
                        props.likes.includes(user.displayName) ? (

                            <FavoriteIcon className="commentButton__favoriteSelected" fontSize="small"/>
                            
                        ) : (
                        
                            <FavoriteBorderIcon className="commentButton__favorite" fontSize="small"/>
                        )
                    }
                    
                </IconButton>
                <p>{props.likes.length}</p>
            </div>
        </div>
    );
}


export default Comment;