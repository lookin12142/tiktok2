import React, {useState, useContext, useEffect} from 'react';
import './PostContent.css';
import CommentIcon from '../icons/CommentIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '../icons/ShareIcon';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import Login from '../login/Login';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import {UserContext, PostsContext} from '../context/Context';
import {db} from '../firebase/firebase';


function PostContent(props) {

    const {user, setUser} = useContext(UserContext);
    const {posts, setPosts} = useContext(PostsContext);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const favoriteClick = () => {
        if(user) {
            if(((posts.filter((post) => post.id === props.postid))[0].data.like.length === 0) || 
            (!(posts.filter((post) => post.id === props.postid))[0].data.like.includes(user.displayName))){
                db.collection("posts").doc(props.postid).set({
                    avatar: (posts.filter((post) => post.id === props.postid))[0].data.avatar,
                    caption: (posts.filter((post) => post.id === props.postid))[0].data.caption,
                    like: [...(posts.filter((post) => post.id === props.postid))[0].data.like, user.displayName],
                    name: (posts.filter((post) => post.id === props.postid))[0].data.name,
                    nickname: (posts.filter((post) => post.id === props.postid))[0].data.nickname,
                    video: (posts.filter((post) => post.id === props.postid))[0].data.video,
                    comments: (posts.filter((post) => post.id === props.postid))[0].data.comments,
                    time: (posts.filter((post) => post.id === props.postid))[0].data.time
                })
            }
            else {
                let index = (posts.filter((post) => post.id === props.postid))[0].data.like.indexOf(user.displayName);
                let array = (posts.filter((post) => post.id === props.postid))[0].data.like;

                array.splice(index,1);

                db.collection("posts").doc(props.postid).set({
                    avatar: (posts.filter((post) => post.id === props.postid))[0].data.avatar,
                    caption: (posts.filter((post) => post.id === props.postid))[0].data.caption,
                    like: array,
                    name: (posts.filter((post) => post.id === props.postid))[0].data.name,
                    nickname: (posts.filter((post) => post.id === props.postid))[0].data.nickname,
                    video: (posts.filter((post) => post.id === props.postid))[0].data.video,
                    comments: (posts.filter((post) => post.id === props.postid))[0].data.comments,
                    time: (posts.filter((post) => post.id === props.postid))[0].data.time
                })
            }
           
        }
        else {
            setOpenModal(true);
        }
    }

    return(
        <div className="postContent">
            <div className="postContent__container">
                <div className="postContent__header">  
                    <div className="postContent__user">
                        <h3>{props.nickname}</h3>
                        <h4>{props.name}</h4>
                    </div> 
                </div>
                <div className="postContent__body">
                    <div className="contentBody__caption">
                        <p>
                           {props.caption}
                        </p>
                    </div>
                    <div className="contentBody__body">
                        <div className="contentBody__video">
                            <Link to={`/detail/${props.postid}`}>
                                <video className="contentVideo" controls disablePictureInPicture controlsList="nodownload" loop src={props.video}>
                                </video>
                            </Link>
                        </div>
                        <div className="contentBody__button">
                            <div className="buttonIcon">
                                <IconButton className="buttonIcon__click" onClick={favoriteClick}>
                                    {
                                        user ? (
                                            <FavoriteIcon className={(posts.filter((post) => post.id === props.postid))[0].data.like.includes(user.displayName) ? "buttonIcon__favoriteSelected" : "buttonIcon__favorite"}/>
                                        ) : (
                                            <FavoriteIcon className= "buttonIcon__favorite"/>
                                        )
                                    }
                                    
                                </IconButton>
                                <p>{props.like.length}</p>
                            </div>
                            <div className="buttonIcon">
                                {
                                    user ? (
                                    <Link to={`/detail/${props.postid}`}>
                                        <IconButton className="buttonIcon__click">
                                            <CommentIcon/>
                                        </IconButton>
                                    </Link>
                                    ):(
                                    <div>
                                        <IconButton className="buttonIcon__click" onClick={handleOpen}>
                                            <CommentIcon/>
                                        </IconButton>
                                        <Modal
                                            open={openModal}
                                            onClose={handleClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            <DialogContent>
                                                <Login close={handleClose}/>
                                            </DialogContent>
                                        </Modal>
                                    </div>
                                    )
                                }
                                <p>{props.cmts}</p>
                            </div>
                            <div className="buttonIcon">
                                <IconButton className="buttonIcon__click">
                                    <ShareIcon/>
                                </IconButton>
                                <p>59.6K</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="postContent__button">
                <button>Follow</button>
            </div> 
        </div>  
    );
}


export default PostContent;