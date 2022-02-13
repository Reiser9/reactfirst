let initialState = {
    messagePageMessage: [
        {id: 1, message: "Привет, го завтра гулять?"},
        {id: 2, message: "Гоооооооооо"},
        {id: 3, message: "Завтра к 7 утра подойду"},
        {id: 4, message: "Ок, перед выходом напиши или позвони"},
        {id: 5, message: "Ок"}
    ],
    messagePageDialogs: [
        {id: 1, name: "Юля"},
        {id: 2, name: "Влад"},
        {id: 3, name: "Александр"},
        {id: 4, name: "Егор"},
        {id: 5, name: "Артем"}
    ]
}

// Передаем начальный state, т.к redux при первом action не получает state и падает ошибка
const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'addMessage':
            let newMessage = {
                id: 6,
                message: action.message
            }
            return {
                ...state,
                messagePageMessage: [...state.messagePageMessage, newMessage]
            };
        default:
            return state;
    }
}

export const addMessageCreator = (message) => {
    return {
        type: 'addMessage',
        message
    }
}

export default dialogsReducer;