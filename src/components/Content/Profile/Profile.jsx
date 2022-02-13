import React, {useState, useEffect} from 'react';
import './Profile.css';
import Title from './../Title/Title';
import Post from './Post/Post';
import Preloader from '../../common/Preloader/Preloader';
import {reduxForm} from 'redux-form';
import {required, maxLengthThunk} from '../../../utils/validate/validate';
import {Textarea, Input, CreateFields} from '../../../utils/form/form';

const Profile = React.memo(props => {

    const [editMode, setEditMode] = useState(false);
    const [editModeInfo, setEditModeInfo] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusThunk(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    const post = props.posts.map(p => <Post likes={p.likes} message={p.message} key={p.id} />);

    const addPost = (val) => {
        props.addPostActionCreator(val.postText);
    }

    const loadPhoto = (e) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0]);
        }
    }

    const goToEditMode = () => {
        setEditModeInfo(true);
    }

    const onSubmit = (profileInfo) => {
        props.saveProfile(profileInfo).then(() => {
            setEditModeInfo(false);
        });
    }

    if(!props.profile.photos){
        return <Preloader />
    }
    
    return (
        <div className="content__inner">
            <Title value="Профиль" />

            <div className="profile__info">
                <div className="profile__img--inner">
                    <img src={props.profile.photos.large ? props.profile.photos.large : "https://html5css.ru/w3css/img_avatar3.png"} alt="аватарка" class="profile__img"/>
                </div>

                {props.isOwner && <input type="file" onChange={loadPhoto} />}

                <div className="profile__status">
                    {props.isOwner ? (!editMode ? <span onClick={activateEditMode}>{status + " - статус"}</span>
                               : <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />)
                               : <span>{status + " - статус"}</span>}
                </div>

                {editModeInfo ? <ProfileDataFormRedux initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} /> : <ProfileData goToEditMode={goToEditMode} profile={props.profile} isOwner={props.isOwner} />}
            </div>

            <div className="profile__content">
                <ProfilePostFormRedux onSubmit={addPost} />

                <div className="profile__post--inner">
                    {post}
                </div>
            </div>
        </div>
    );
});

// Все компоненты нужно выносить в отдельные файлы, мне лень

const ProfileData = (props) => {
    return(
        <div className="profile__info--inner">
            {props.isOwner && <button onClick={props.goToEditMode}>Редактировать</button>}

            <div className="profile__name">
                <b>Полное имя: </b> {props.profile.fullName}
            </div>

            <div className="profile__info--item">
                <b>Ищет работу: </b> {props.profile.lookingForAJob ? 'Да' : 'Нет'}
            </div>

            {props.profile.lookingForAJob && <div className="profile__info--item">
                <b>Проффесия: </b> {props.profile.lookingForAJobDescription}
            </div>}

            <div className="profile__info--item">
                <b>Обо мне: </b> {props.profile.aboutMe ? props.profile.aboutMe : 'Не указана информация'}
            </div>

            <div className="profile__info--contact">
                <div className="profile__info--contact--title">
                    Контакты:
                </div>

                {Object.keys(props.profile.contacts).map(key => {
                    return <ContactInfo key={key} title={key} value={props.profile.contacts[key]} />
                })}
            </div>
        </div>
    )
}

const ProfileDataForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="profile__info--inner">
            <button onClick={props.onSubmit}>Сохранить</button>

            {props.error && <div className="some__error">{props.error}</div>}

            <div className="profile__name">
                <b>Полное имя: </b> {CreateFields(Input, 'fullName', 'text', 'Полное имя', [], '')}
            </div>

            <div className="profile__info--item">
                <b>Ищет работу: </b> {CreateFields(Input, 'lookingForAJob', 'checkbox', '', [], '')}
            </div>

            <div className="profile__info--item">
                <b>Проффесия: </b> {CreateFields(Textarea, 'lookingForAJobDescription', '', 'О профессии', [], '')}
            </div>

            <div className="profile__info--item">
                <b>Обо мне: </b> {CreateFields(Textarea, 'aboutMe', '', 'Обо мне', [], '')}
            </div>

            <div className="profile__info--contact">
                <div className="profile__info--contact--title">
                    Контакты:
                </div>

                {Object.keys(props.profile.contacts).map(key => {
                    return(
                        <b key={key}>{key}: {CreateFields(Input, 'contacts.' + key, 'text', key, [], '')}</b>
                    )
                })}
            </div>
        </form>
    )
}

const ContactInfo = ({title, value}) => {
    return (
        <div className="profile__info--contact--item">
            <b>{title}: </b> {value ? value : 'Не указана информация'}
        </div>
    )
}

const maxLength20 = maxLengthThunk(20);

const ProfilePostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="profile__add--post--inner">
            {CreateFields(Textarea, 'postText', '', 'Введите сообщение...', [required, maxLength20], [])}

            <button className="button profile__add--button">
                Добавить пост
            </button>
        </form>
    )
}

const ProfilePostFormRedux = reduxForm({
    form: 'profilePost'
})(ProfilePostForm)

const ProfileDataFormRedux = reduxForm({
    form: 'profileInfo'
})(ProfileDataForm)

export default Profile;