import React from 'react';
import "./UsersContent.css";
import {NavLink} from 'react-router-dom';

const UsersContent = (props) => {
    return(
        <div className="content__content">
            {
                props.users.map(u => 
                    <div key={u.id} className="users__item">
                        <div className="users__item--img--box">
                            <NavLink to={"/profile/" + u.id} className="users__item--img--inner">
                                <img src={u.photos.small != null ? u.photos.small : "https://html5css.ru/w3css/img_avatar3.png"} alt="Аватарка" className="users__item--img"/>
                            </NavLink>
                            
                            {u.followed 
                            ? <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollowThunk(u.id);
                            }} className="users__item--button--follow">Отписаться</button> 

                            : <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                props.followThunk(u.id); 
                            }} className="users__item--button--follow">Подписаться</button>}
                        </div>

                        <div className="users__item--text--box">
                            <div className="users__item--text--inner">
                                <div className="users__item--text--name">
                                    {u.name}
                                </div>

                                <div className="users__item--text--status">
                                    {u.status}
                                </div>
                            </div>

                            <div className="users__item--text--country">
                                
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
};

export default UsersContent;