import React, {useState} from 'react';
import './Login.css'; 
import {auth} from '../firebase/firebase';
import { makeStyles } from '@material-ui/core/styles';


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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid rgba(18, 18, 18, 0.12)',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Login = React.forwardRef((props, ref) =>{

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginHandle = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            //login
            setEmail("");
            setPassword("");
            
        }).catch((error) => alert(error.message));
        
    }

    const registerHandle = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            //create user
            setEmail("");
            setPassword("");
        }).catch((error) => alert(error.message));
    }

    return(

        <div ref={ref} style={modalStyle} className={classes.paper}>
            <div id="simple-modal-title">
                <img className="header__logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1280px-TikTok_logo.svg.png"/>
            </div>
               <form className="loginForm">
                   <label>Email</label>
                   <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                   <label>Password</label>
                   <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                   <div className="loginForm__buttons">
                        <button className="loginButton__signin" type="submit" onClick={loginHandle}>Sign In</button>
                        <button type="submit" onClick={registerHandle}>Register</button>
                   </div>
               </form>
        </div>
    )
}) 

export default Login;