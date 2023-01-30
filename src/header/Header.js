import React, {useState, useContext} from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Login from '../login/Login';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import {UserContext} from '../context/Context';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {auth} from '../firebase/firebase';
import UploadModal  from '../upload_modal/UploadModal';


function Header() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };


    const openUploadModal = () => {
        setUploadModal(true);
    }

    const closeUploadModal = () => {
        setUploadModal(false);
    }

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }


    const logOut = () => {
        if(user) {
            auth.signOut();
        }

        setAnchorEl(null);
    }


    const open = Boolean(anchorEl);

    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1280px-TikTok_logo.svg.png"/>
            </Link>
            <div className="header__searching">
                <input type="text" placeholder="Search..." className="searching__input"/>
                <SearchIcon className="searching__button"/>
            </div>
            {
                user ? (
                    <div className="header__function">
                        <div className="headerIcons">
                            <CloudUploadOutlinedIcon className="headerFunction__icon" onClick={openUploadModal}/>
                            <Modal
                                open={uploadModal}
                                onClose={closeUploadModal}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                            <DialogContent>
                                <UploadModal close={closeUploadModal}/>
                            </DialogContent>
                            </Modal>
                        </div>
                        <div className="headerIcons">
                            <SendOutlinedIcon className="headerFunction__icon"/>
                        </div>
                        <div className="headerIcons">
                            <InboxOutlinedIcon className="headerFunction__icon"/>
                        </div>
                        <div>
                            <Avatar 
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                className="headerFunction__avatar" 
                                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                aria-controls="simple-menu" 
                                aria-haspopup="true" 
                                onMouseOver={openMenu}
                            />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={closeMenu}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <MenuItem onClick={logOut}>
                                    <ExitToAppIcon/>
                                    <span className="menuItem__logout">Log out</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className="modalLogin__button" onClick={handleOpen}>
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
                )
            }
        </div>

    )
}

export default Header;