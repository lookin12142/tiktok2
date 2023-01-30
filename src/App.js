import './App.css';
import VideoComponent from './video_components/VideoComponent';
import React, {useState, useEffect} from 'react';
import Header from './header/Header';
import SideBar from './sidebar/SideBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useParams
} from "react-router-dom";
import PostDetail from './posts/PostDetail';
import {UserContext, PostsContext} from './context/Context';
import {auth, db} from './firebase/firebase';

function App() {

  const[user, setUser] = useState();
  const [posts, setPosts] = useState([]);

    
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {

        let index = authUser.email.indexOf("@");

        authUser.updateProfile({
           displayName: authUser.email.substring(0,index)
         }).then(
           setUser(authUser)
         )
      }
      else {
        setUser(null);
      }
    });

    return () => {

      unsubscribe();
    }

  }, []);


  useEffect(() => {

    let tempArray = [];

    const unsubscribe = db.collection("posts").orderBy("time","desc").onSnapshot((snapShot) => {

        setPosts(snapShot.docs.map((doc) => ({id:doc.id, data:doc.data()})));
        
    });

    return () => {

        unsubscribe();
    }

  }, []);



  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <PostsContext.Provider value={{posts, setPosts}}>
          <Router>
              <Switch>
                  <Route path="/detail/:postid" children={<PostDetail/>}>
                  </Route>
                  <Route path="/">
                    <Header/>
                    <div className="body__content">
                        <SideBar/>
                        <div className="videoPosts">
                          <VideoComponent/>
                        </div>
                    </div>
                  </Route>
              </Switch>
          </Router>
        </PostsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
