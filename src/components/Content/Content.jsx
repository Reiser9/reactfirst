import React from 'react';
import {Route} from 'react-router-dom';
import {withSuspense} from '../../hoc/withSuspense';
import {Redirect, Switch} from 'react-router-dom';
import './Content.css';
const PostContainer = React.lazy(() => import('./Profile/PostContainer'));
const UserContainer = React.lazy(() => import('./UserContainer'));
const MessageContainer = React.lazy(() => import('./Message/MessageContainer'));
const LoginContainer = React.lazy(() => import('./Login/LoginContainer'));

const Content = () => {
    return (
        <section className="content">
            <div className="container">
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

                    <Route path="/profile/:userId?" render={() => withSuspense(PostContainer)} />

                    <Route path="/message" render={() => withSuspense(MessageContainer)} />

                    <Route path="/user" render={() => withSuspense(UserContainer)} />

                    <Route path="/login" render={() => withSuspense(LoginContainer)} />
                </Switch>
            </div>
        </section>
    );
}

export default Content;