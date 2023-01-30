import React, {useState} from 'react';
import Login from './Login';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import './LoginItem.css';


function LoginItem() {

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return(
        <div className="loginItem">
            <p>
                Log in to follow creators, 
                like videos, and view comments.
            </p>
            <div>
                <button className="loginItem__button" onClick={handleOpen}>
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
        </div>
    );
}


export default LoginItem;