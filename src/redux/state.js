import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';

let store = {
    _state: {
        profilePage: {
            profilePagePosts: [
                {id: 1, message: "Привет, это мой первый пост", likes: 12},
                {id: 2, message: "Сегодня был убит живот", likes: 95},
                {id: 3, message: "Рубль упал у мужика на пол", likes: 35}
            ],
            newPostText: ''
        },
        messagePage: {
            messagePageMessage: [
                {id: 1, message: "Привет, го завтра гулять?"},
                {id: 2, message: "Гоооооооооо"},
                {id: 3, message: "Завтра к 7 утра подойду"},
                {id: 4, message: "Ок, перед выходом напиши или позвони"},
                {id: 5, message: "Ок"}
            ],
            newMessageText: '',
            messagePageDialogs: [
                {id: 1, name: "Юля"},
                {id: 2, name: "Влад"},
                {id: 3, name: "Александр"},
                {id: 4, name: "Егор"},
                {id: 5, name: "Артем"}
            ]
        }
    },
    _callSubscriber() {
        console.log('q');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action){
        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.messagePage, action);

        this._callSubscriber();
    }
}

export default store;
window.store = store;