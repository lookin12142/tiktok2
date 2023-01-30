import React, {useState, useRef, useContext} from 'react';
import './UploadModal.css';
import { makeStyles } from '@material-ui/core/styles';
import {storage} from '../firebase/firebase';
import UploadIcon from '../icons/UploadIcon';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {UserContext} from '../context/Context';
import { db} from '../firebase/firebase';
import firebase from 'firebase';
import CircularProgressWithLabel from '../accessories/CircleProgress';



function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    height: 580,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid rgba(18, 18, 18, 0.12)',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




const UploadModal = React.forwardRef((props, ref) =>{

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [video, setVideo] = useState();
    const [checkVid, setCheckVid] = useState(false);
    const [thumbnail, setThumbNail] = useState(null);
    const inputFile = useRef(null);
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);

    const {user, setUser} = useContext(UserContext);

    const handleFile = (e) => {
        if(e.target.files[0]) {
            if(e.target.files[0].name.endsWith('.mp4') === false){
                
                alert("Unsupported media type");
                inputFile.current.value="";
                
                setVideo(null);
                setCheckVid(false);
                
            }
            else {
                
                setThumbNail(URL.createObjectURL(e.target.files[0]));
               
                setVideo(e.target.files[0]);
                setCheckVid(true);
            }
        }
        
    }


    const handleUpload = (e) => {
        e.preventDefault();
        if(checkVid) {
            const upLoadVid = storage.ref('videos/'+ video.name).put(video);
            upLoadVid.on("state_changed", snapshot => {
                    setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)); 
                }, error => {console.log(error)}, () => {
                        storage.ref('videos')
                                .child(video.name)
                                .getDownloadURL()
                                .then(url => {
                                        db.collection("posts").add({
                                           avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
                                           caption: caption,
                                           nickname: user.displayName,
                                           name: user.displayName,
                                           comments:0,
                                           like:[],
                                           video: url,
                                           time: firebase.firestore.FieldValue.serverTimestamp()
                                        })
                                        
                                        setThumbNail("");
                                        setCheckVid(false);
                                        setVideo(null);
                                        setCaption("");
                                        setProgress(0);
                                        props.close();
                                })
                    })  
        }

    }


    const handleOpenFile = () => {
        inputFile.current.click();
    }
    

    return(

        <div ref={ref} style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">
                Upload Video
            </h3>
               <form className="uploadModal__form">
                   {
                       thumbnail ? (
                        <div className="uploadForm__main">
                            {progress !== 0 && (<CircularProgressWithLabel value={progress} />)}
                            <div className="uploadForm__video">
                                <IconButton className="uploadForm__close" onClick={handleOpenFile}>
                                    <CancelIcon className="uploadClose__button"/>
                                </IconButton>
                                <video className="uploadVideo__thumb" style={{filter:`blur(${progress/50}px)`}}controls disablePictureInPicture controlsList="nodownload" loop src={thumbnail}>
                                </video>
                            </div>
                            <input ref={inputFile} type="file" onChange={handleFile} style={{visibility:"hidden"}} accept="video/*"/>
                        </div>
                       ) : (
                        <div className="uploadForm__main">
                            <div onClick={handleOpenFile} className="uploadForm__open">
                                <div>
                                    <UploadIcon/>
                                    <h3>
                                        Select video to upload
                                    </h3>
                                </div>
                            </div>
                            <input ref={inputFile} type="file" onChange={handleFile} style={{visibility:"hidden"}} accept="video/*"/>
                        </div>
                       )
                   }
                   <div className="uploadForm__container">
                       <h5>Caption</h5>
                       <textarea rows="2" maxLength="150" onChange={(e) => setCaption(e.target.value)}>

                       </textarea>
                       
                        <button onClick={handleUpload}>
                            Upload
                        </button>
                       
                   </div>
               </form>
        </div>
    )
}) 


export default UploadModal;