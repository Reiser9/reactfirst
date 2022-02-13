import MessageSend from './MessageSend';
import {addMessageCreator} from './../../../../redux/dialogsReducer';
import {connect} from 'react-redux';

let mapStateToProps = (state) => {
    return {
        newMessageText: state.messagePage.newMessageText
    }
}

const MessageSendContainer = connect(mapStateToProps, {addMessageCreator})(MessageSend);

export default MessageSendContainer;