import React from 'react';
import './User.css';
import Title from '../Title/Title';
import UsersContent from './UsersContent/UsersContent';
import Preloader from '../../common/Preloader/Preloader';
import Paginator from '../../common/Paginator/Paginator';

let User = (props) => {
    return (
        <div className="content__inner">
            <Title value="Пользователи" />
            {props.inProgress && <Preloader />}
            <UsersContent users={props.users} followThunk={props.followThunk} unfollowThunk={props.unfollowThunk} follow={props.follow} unfollow={props.unfollow} followingProgress={props.followingProgress} followingProgressAC={props.followingProgressAC} />
            <Paginator onCurrentChange={props.onCurrentChange} currentPage={props.currentPage} totalUserCount={props.totalUserCount} pageSize={props.pageSize} />
        </div>);
};

export default User;