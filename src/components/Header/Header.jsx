import React from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
    const logout = () => {
        props.logoutThunk();
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__inner--logo--inner">
                        <img src="https://interior-stickers.ru/69166-thickbox_default/logotip-arizona-coyotes-arizona-koyotis.jpg" alt="Логотип" className="header__inner--logo"/>
                    </div>

                    <nav className="header__nav">
                        <NavLink to="/profile" activeClassName="active" className="header__nav--link">Профиль</NavLink>
                        <NavLink to="/message" activeClassName="active" className="header__nav--link">Диалоги</NavLink>
                        <NavLink to="/user" activeClassName="active" className="header__nav--link">Пользователи</NavLink>
                    </nav>

                    {props.data.isAuth ? <div>{props.data.login} - <button onClick={logout}>Выйти</button></div> : 

                    <div className="header__button--inner">
                        <NavLink to={'/login'} className="button header__button enter">
                            Вход
                        </NavLink>

                        <NavLink to={'/register'} className="button header__button register">
                            Регистрация
                        </NavLink>
                    </div>}
                    
                </div>
            </div>
        </header>
    );
}

export default Header;