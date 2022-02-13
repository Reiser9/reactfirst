import React from 'react';
import User from './User/User';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {follow, unfollow, setCurrentPage, followingProgressAC, getUsers, unfollowThunk, followThunk, getUsersPag } from '../../redux/userReducer';
import {requestUsers, requestPageSize, requestTotalUserCount, requestCurrentPage, requestInProgress, requestFollowingProgress} from '../../redux/user-selectors';

class UserContainerAPI extends React.Component{
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onCurrentChange = (d) => {
        this.props.getUsers(d, this.props.pageSize);
        this.props.getUsersPag(d);
    }

    render = () => {
        return (
            <User totalUserCount={this.props.totalUserCount}
                  pageSize={this.props.pageSize}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  onCurrentChange={this.onCurrentChange}
                  currentPage={this.props.currentPage}
                  inProgress={this.props.inProgress}
                  followingProgress={this.props.followingProgress}
                  followingProgressAC={this.props.followingProgressAC}
                  unfollowThunk={this.props.unfollowThunk}
                  followThunk={this.props.followThunk} />
        );
    }
}

let mapStateToProps = (state) => {
    return{
        users: requestUsers(state),
        pageSize: requestPageSize(state),
        totalUserCount: requestTotalUserCount(state),
        currentPage: requestCurrentPage(state),
        inProgress: requestInProgress(state),
        followingProgress: requestFollowingProgress(state)
    }
};

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, followingProgressAC, getUsers, getUsersPag, unfollowThunk, followThunk})
)(UserContainerAPI);