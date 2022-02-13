import React from 'react';
import './DialogsItem.css';

const DialogItem = (props) => {
    return (
        <div className="message__dialogs--item">
            {props.name}
        </div>
    );
}

export default DialogItem;