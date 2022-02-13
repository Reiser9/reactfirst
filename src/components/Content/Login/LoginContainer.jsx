import React from 'react';
import Login from './Login';
import {connect} from 'react-redux';
import {compose} from 'redux';

class LoginContainer extends React.Component{
    componentDidMount = () => {

    }

    render = () => {
        return(
            <Login />
        )
    }
}

let mapStateToProps = (state) => ({

});

export default compose(connect(mapStateToProps, {}))(LoginContainer);