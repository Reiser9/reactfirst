import React from 'react';
import './MessageSend.css';
import {reduxForm, Field} from 'redux-form';
import {Textarea} from '../../../../utils/form/form';
import {required, maxLengthThunk} from '../../../../utils/validate/validate';

const MessageSend = (props) => {
    let messageAdd = (val) => {
        props.addMessageCreator(val.newTextMessage);
    }

    return (
        <MessageSendFormRedux onSubmit={messageAdd} />
    )
}

let maxLength50 = maxLengthThunk(50)

const MessageSendForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="message__new--inner">
            <Field component={Textarea} name={"newTextMessage"} placeholder={"Напишите сообщение..."} validate={[required, maxLength50]} />

            <button className="button message__send--button">
                Отправить
            </button>
        </form>
    )
}

const MessageSendFormRedux = reduxForm({
    form: 'messageSend'
})(MessageSendForm)

export default MessageSend;