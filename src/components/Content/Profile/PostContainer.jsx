import {addPostActionCreator} from './../../../redux/profileReducer';
import ProfileContainer from './ProfileContainer';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {compose} from 'redux';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.profilePagePosts,
        newPostText: state.profilePage.newPostText
    }
}

const PostContainer = compose(
    withRouter,
    connect(mapStateToProps, {addPostActionCreator})
)(ProfileContainer);

export default PostContainer;