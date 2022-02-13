import React from 'react';
import './Post.css';

const Post = (props) => {
    return (
        <div className="profile__post--item">
            <div className="profile__post--img--inner">
                <img src="https://download-cs.net/steam/avatars/3412.jpg" alt="аватарка" className="profile__post--img"/>
            </div>

            <div className="profile__post--content--inner">
                <div className="profile__post--likes">
                    Нравится: {props.likes}
                </div>

                <div className="profile__post--text">
                    {props.message}
                </div>
            </div>
        </div>
    );
}

export default Post;