import React from 'react';
import './Login.css';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {loginThunk, getCaptchaThunk} from '../../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {Input, CreateFields} from '../../../utils/form/form';
import {required} from '../../../utils/validate/validate';

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunk(formData.login, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth){
        return <Redirect to={"/profile"} />
    }

    return(
        <div className="login__content">
            <div className="login__title">
                Авторизация
            </div>

            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha} />
        </div>
    )
}

const LoginForm = (props) => {
    return(
        <form className="login__inner" onSubmit={props.handleSubmit} >
            {CreateFields(Input, 'login', 'text', 'Логин', [required], ['input login__input'])}
            {CreateFields(Input, 'password', 'password', 'Пароль', [required], ['input login__input'])}
            {CreateFields('input', 'rememberMe', 'checkbox', '', [], [])} Запомнить меня
            {props.captcha && <img src={props.captcha} />}
            {props.captcha && CreateFields(Input, 'captcha', 'text', 'Капча', [required], [])}

            {props.error && <div className="some__error">{props.error}</div>}

            <button class="login__submit">Войти</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
})

export default connect(mapStateToProps, {loginThunk, getCaptchaThunk})(Login);