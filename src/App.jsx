import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {initializedApp} from './redux/app-reducer';
import {connect} from 'react-redux';
import HeaderContainer from './components/Header/HeaderContainer';
import Content from './components/Content/Content';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component{
	componentDidMount = () => {
        this.props.initializedApp();
	}
	
	render = () => {
		if(!this.props.initialized){
			return <Preloader />;
		}

		return (
			<BrowserRouter>
				<HeaderContainer />
				<Content />
			</BrowserRouter>
		);
	} 
}

let mapStateToProps = (state) => {
    return{
        initialized: state.app.initialized
    }
};

export default connect(mapStateToProps, {initializedApp})(App);