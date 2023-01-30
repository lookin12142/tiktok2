import React, {useContext, useState} from 'react';
import './SideBar.css';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import MenuItem from '../menu/MenuItem';
import AccountSuggestion from '../accessories/AccountSuggestion';
import DiscoverTag from '../accessories/DiscoverTag';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SearchIcon from '@material-ui/icons/Search';
import HashTag from '../accessories/HashTag';
import {UserContext} from '../context/Context';
import LoginItem from '../login/LoginItem';

function SideBar() {

    const[active, setActive] = useState();
    const {user, setUser} = useContext(UserContext);

    return(
        <div className="sidebar">
            <div className="sidebar__menu">
                <MenuItem selected={active === "For You"} title="For You" icon={HomeRoundedIcon} onClick={() => setActive("For You")}/>
                <MenuItem selected={active === "Following"} title="Following" icon={SupervisorAccountRoundedIcon}  onClick={() => setActive("Following")}/>
                {
                    user ? (
                        <MenuItem selected={active === "LIVE"} title="LIVE" icon={VideocamRoundedIcon}  onClick={() => setActive("LIVE")}/>
                    ):(
                        <LoginItem/>
                    )
                }
            </div>
            <div className="suggest__account">
                <p className="sidebarPart__header">Suggested accounts</p>
                <AccountSuggestion/>
                <AccountSuggestion/>
                <AccountSuggestion/>
                <AccountSuggestion/>
                <AccountSuggestion/>
            </div>
            <div className="following__account">
                <p className="sidebarPart__header">Your top accounts</p>
                <AccountSuggestion 
                    img="https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
                    title="no_image" name="No Image"
                />
                <AccountSuggestion
                    img="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    title="hello__world"
                    name="Hello World"
                />
                <AccountSuggestion
                    img="https://wallpapercave.com/wp/wp2180667.jpg"
                    title="turnon"
                    name="Turn Off"
                />
            </div>
            <div className="sidebar__discorver">
                <p className="sidebarPart__header" style={{fontSize:"16px"}}>Discover</p>
                <DiscoverTag icon={HashTag} tag="patioseason"/>
                <DiscoverTag icon={HashTag} tag="adultswim"/>
                <DiscoverTag icon={SearchIcon} tag="euro"/>
                <DiscoverTag icon={MusicNoteIcon} tag="Then Leave (feat. Queendom Come) - BeatK..."/>
                <DiscoverTag icon={MusicNoteIcon} tag="Hood Baby - Kbfr"/>
                <DiscoverTag icon={MusicNoteIcon} tag="Stunnin' (feat. Harm Franklin) - Curtis Waters"/>
                <DiscoverTag icon={SearchIcon} tag="bts"/>
                <DiscoverTag icon={SearchIcon} tag="mashup 2021"/>
                <DiscoverTag icon={HashTag} tag="foryourpride"/>
                <DiscoverTag icon={HashTag} tag="bucketlist"/>
            </div>
            <div className="sidebar__footer">
                <div className="sidebarFooter__component">
                    <a href="#">About</a>
                    <a href="#">Newrooms</a>
                    <a href="#">Contact</a>
                    <a className="careers" href="#">Careers</a>
                    <a href="#">ByteDance</a>
                </div>
                <div className="sidebarFooter__component">
                    <a href="#">Tiktak for Good</a>
                    <a href="#">Advertise</a>
                    <a href="#">Developers</a>
                    <a href="#">Transparency</a>
                </div>
                <div className="sidebarFooter__component">
                    <a href="#">Help</a>
                    <a href="#">Safty</a>
                    <a href="#">Term</a>
                    <a href="#">Privacy</a>
                    <div className="sidebarFooter__link">
                        <a href="#">Creator Portal</a>
                        <a href="#">Community Guidelines</a>
                    </div>
                    <a href="#">Copyright</a>
                </div>
                <div className="sidebarFooter__component">
                    <p>More</p>
                </div>
                <div className="sidebarFooter__component">
                   <p>© 2021 Tiktak</p>
                </div>
            </div>
        </div>
    );
}


export default SideBar;