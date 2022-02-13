import React from 'react';
import './MessageItem.css';

const MessageItem = (props) => {
    return (
        <div className="message__message--item">
            {props.message}
        </div>
    );
}

export default MessageItem;