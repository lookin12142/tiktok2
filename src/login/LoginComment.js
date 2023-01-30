import React, {useState} from 'react'
import Login from './Login';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import './LoginComment.css';


function LoginComment() {

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div className="loginComment__container">
            <div className="loginComment">
                <h3>
                    Login to see comments
                </h3>
                <p>
                    Login to see comments and like the video.
                </p>
                <div>
                    <button className="loginComment__button" onClick={handleOpen}>
                        Log in
                    </button>
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
                <span>Don’t have an account?<span className="loginComment__signup" onClick={handleOpen}>Sign up</span></span>
            </div>           
        </div>
    )
}


export default LoginComment;