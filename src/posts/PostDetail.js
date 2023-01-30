import React, { useEffect, useState, useContext } from 'react';
import './PostDetail.css';
import Avatar from '@material-ui/core/Avatar';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import IconButton from '@material-ui/core/IconButton';
import {Link, useParams} from "react-router-dom";
import CommentIcon from '../icons/CommentIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { SocialIcon } from 'react-social-icons';
import { ImEmbed2} from 'react-icons/im';
import Comment from '../comments/Comment';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import {db} from '../firebase/firebase';
import firebase from 'firebase';
import {UserContext, PostsContext} from '../context/Context';
import LoginComment from '../login/LoginComment';
import Login from '../login/Login';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import Picker from 'emoji-picker-react';
import Popover from '@material-ui/core/Popover';

function PostDetail(props) {

    const {postid} = useParams();
    const [comments, setComments] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const{posts, setPosts} = useContext(PostsContext);
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const closePopover = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    
    const handleClose = () => {
        setOpenModal(false);
    };

    

    const onEmojiClick = (event, emojiObject) => {
        setInput(input + emojiObject.emoji);
    };

    const [input, setInput] = useState("");

    

    const handleSend = () => {


        db.collection("posts").doc(postid).collection("comments").add({
            avatar:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
            likes: [],
            comment: input,
            nickname: user.displayName,
            time: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            db.collection("posts").doc(postid).set({
                avatar: (posts.filter((post) => post.id === postid))[0].data.avatar,
                caption: (posts.filter((post) => post.id === postid))[0].data.caption,
                like: (posts.filter((post) => post.id === postid))[0].data.like,
                name: (posts.filter((post) => post.id === postid))[0].data.name,
                nickname: (posts.filter((post) => post.id === postid))[0].data.nickname,
                video: (posts.filter((post) => post.id === postid))[0].data.video,
                comments: (posts.filter((post) => post.id === postid))[0].data.comments + 1,
                time: (posts.filter((post) => post.id === postid))[0].data.time
            })
        });

        setInput("");
    }

    


    useEffect(() => {

        const unsubscribe = db.collection("posts").doc(postid).collection("comments").orderBy("time").onSnapshot((querySnapshot) => 
        
            setComments(querySnapshot.docs.map((doc) => ({id:doc.id, data:doc.data()})))

        );

        return () => {

            unsubscribe();
        }
        
    }, []);


    const favoriteClick = () => {
        if(user) {
            if(((posts.filter((post) => post.id === postid))[0].data.like.length === 0) || 
            (!(posts.filter((post) => post.id === postid))[0].data.like.includes(user.displayName))){
                db.collection("posts").doc(postid).set({
                    avatar: (posts.filter((post) => post.id === postid))[0].data.avatar,
                    caption: (posts.filter((post) => post.id === postid))[0].data.caption,
                    like: [...(posts.filter((post) => post.id === postid))[0].data.like, user.displayName],
                    name: (posts.filter((post) => post.id === postid))[0].data.name,
                    nickname: (posts.filter((post) => post.id === postid))[0].data.nickname,
                    video: (posts.filter((post) => post.id === postid))[0].data.video,
                    comments: (posts.filter((post) => post.id === postid))[0].data.comments,
                    time: (posts.filter((post) => post.id === postid))[0].data.time
                })
            }
            else {
                let index = (posts.filter((post) => post.id === postid))[0].data.like.indexOf(user.displayName);
                let array = (posts.filter((post) => post.id === postid))[0].data.like;

                array.splice(index,1);

                db.collection("posts").doc(postid).set({
                    avatar: (posts.filter((post) => post.id === postid))[0].data.avatar,
                    caption: (posts.filter((post) => post.id === postid))[0].data.caption,
                    like: array,
                    name: (posts.filter((post) => post.id === postid))[0].data.name,
                    nickname: (posts.filter((post) => post.id === postid))[0].data.nickname,
                    video: (posts.filter((post) => post.id === postid))[0].data.video,
                    comments: (posts.filter((post) => post.id === postid))[0].data.comments,
                    time: (posts.filter((post) => post.id === postid))[0].data.time
                })
            }
           
        }
        else {
            setOpenModal(true);
        }
    }


    return(

        <div className="postDetail">
            <div className="postDetail__videoContainer">
                <div>
                    <div className="videoContainer__button">
                        <Link to="/">
                            <IconButton className="videoContainer__closeButton">
                                <CloseOutlinedIcon className="videoContainer__closeIcon"/>
                            </IconButton>
                        </Link>
                    </div>
                    <div className="videoContainer__video">
                        <video className="postDetail__video" controls disablePictureInPicture controlsList="nodownload" loop src={(posts.filter((post) => post.id === postid))[0].data.video}>
                        </video>
                    </div>
                </div>
            </div>
            <div className="postDetail__info">
                <div className="detailInfo__header">
                    <div className="detailInfo__userHeader">
                        <Avatar src={(posts.filter((post) => post.id === postid))[0].data.avatar}/>
                        <div className="infouser__infoContainer">
                            <p className="infouser__nick">{(posts.filter((post) => post.id === postid))[0].data.nickname}</p>
                            <p className="infouser__name">{(posts.filter((post) => post.id === postid))[0].data.name}</p>
                        </div>
                        <button>Follow</button>
                    </div>
                    <div className="detailInfo__headerCaption">
                        <p>
                           {(posts.filter((post) => post.id === postid))[0].data.caption}
                        </p>
                    </div>
                    <div className="detailInfo__headerButtons">
                        <div className="headerButtons__container">
                            <div className="headerButton__container">
                                <IconButton className="headerButton__click" size="small" onClick={favoriteClick}>
                                    {
                                        user ? (
                                            <FavoriteIcon className={(posts.filter((post) => post.id === postid))[0].data.like.includes(user.displayName) ? "headerButton__favoriteSelected" : "headerButton__favorite"} fontSize="small"/>
                                        ):(
                                            <FavoriteIcon className="headerButton__favorite" fontSize="small"/>
                                        )
                                    }
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
                                <span>{(posts.filter((post) => post.id === postid))[0].data.like.length}</span>
                            </div>
                            <div className="headerButton__container">
                                <IconButton className="headerButton__click" disabled size="small">
                                    <CommentIcon size="1x"/>
                                </IconButton>
                                <span>{(posts.filter((post) => post.id === postid))[0].data.comments}</span>
                            </div>
                        </div>
                       
                        <div className="detailInfo__headerShare">
                            <span>Share to</span>
                            <SocialIcon className="headerShare__socialIcon" style={{ height: 25, width: 25 }} url="https://whatsapp.com"/>
                            <SocialIcon className="headerShare__socialIcon" style={{ height: 25, width: 25 }} url="https://facebook.com" />
                            <SocialIcon className="headerShare__socialIcon" style={{ height: 25, width: 25 }} url="https://twitter.com" />
                            <IconButton size="small" style={{backgroundColor:"rgba(80,82,90,1)", marginLeft:"8px"}}>
                                <ImEmbed2 style={{fill:"white", padding:"1px"}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                {
                    user ? (
                        <div>
                            <div className="detailInfo__comment">
                                {
                                    comments.map((cmt, i) => (
                                        <Comment
                                            key={i}
                                            cmtId={cmt.id}
                                            postId={postid}
                                            avatar={cmt.data.avatar}
                                            comment={cmt.data.comment}
                                            likes={cmt.data.likes}
                                            nickname={cmt.data.nickname}
                                            time={cmt.data.time}
                                        />
                                    ))
                                }
                            </div>
                            <div className="detailInfo__input">
                                <div className="detailInfo__inputContainer">
                                    <input type="text" placeholder="Add a comment..." value={input} onChange={(e) => setInput(e.target.value)}/>
                                    <IconButton className="inputComment__iconContainer" size="small" aria-describedby={id} onClick={handleClick}>
                                        <EmojiEmotionsOutlinedIcon className="inputComment__icon" />
                                    </IconButton>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={closePopover}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                          }}
                                        transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                        }}
                                    >
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </Popover>
                                </div>
                                <button onClick={handleSend} disabled={!input} className={!input && "disabled__button"}>Post</button>   
                            </div>
                        </div>
                    ) : (
                        
                        <LoginComment/>
                    )
                }
            </div>
        </div>
    );

}


export default PostDetail;