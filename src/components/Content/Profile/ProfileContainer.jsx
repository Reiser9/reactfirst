import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {setUserProfileThunk, setStatusThunk, updateStatusThunk, savePhotoThunk, saveProfileThunk} from '../../../redux/profileReducer';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';

class ProfileContainer extends React.PureComponent{
    refreshComponent(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId;
        }
        this.props.setUserProfileThunk(userId);
        this.props.setStatusThunk(userId);
    }

    componentDidMount = () => {
        this.refreshComponent();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }

        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshComponent();
        }
    }
    
    render = () => {
        return(
            <Profile {...this.props} saveProfile={this.props.saveProfileThunk} profile={this.props.profile} status={this.props.status} state={this.state}
            updateStatusThunk={this.props.updateStatusThunk} isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhotoThunk} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
});


export default compose(
    connect(mapStateToProps, {setUserProfileThunk, setStatusThunk, updateStatusThunk, savePhotoThunk, saveProfileThunk}),
    withAuthRedirect
)(ProfileContainer);