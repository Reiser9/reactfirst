import Message from './Message';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.messagePageDialogs,
        message: state.messagePage.messagePageMessage
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Message);