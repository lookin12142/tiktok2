import React, {useContext} from 'react';
import './VideoComponent.css';
import Avatar from '@material-ui/core/Avatar';
import PostContent from '../posts/PostContent';
import {PostsContext} from '../context/Context';

function VideoComponent() {

    const{posts, setPosts} = useContext(PostsContext);

    return(
        <div>
            {
                posts.map((post, i) => (
                    <div className="videoComponent" key={i}>
                        <Avatar src={post.data.avatar} className="videoComponent__avatar"/>
                        <PostContent
                            postid={post.id}
                            nickname={post.data.nickname} 
                            name={post.data.name} 
                            caption={post.data.caption} 
                            video={post.data.video}
                            like={post.data.like}
                            cmts={post.data.comments}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default VideoComponent;