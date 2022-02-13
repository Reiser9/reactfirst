import React from 'react';
import './Message.css';
import Title from './../Title/Title';
import DialogsItem from './DialogsItem/DialogsItem';
import MessageItem from './MessageItem/MessageItem';
import MessageSendContainer from './MessageSend/MessageSendContainer';

const Message = (props) => {
    let messageDialogs = props.dialogs.map(d => <DialogsItem name={d.name} key={d.id} />)
    let messageMessage = props.message.map(m => <MessageItem message={m.message} key={m.id} />)

    return (
        <div className="content__inner">
            <Title value="Диалоги" />

            <div className="message__content">
                <div className="message__dialogs--inner">
                    {messageDialogs}
                </div>

                <div className="message__message--inner">
                    {messageMessage}

                    <MessageSendContainer store={props.store} />
                </div>
            </div>
        </div>
    );
}

export default Message;