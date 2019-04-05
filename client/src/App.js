import React, { Component } from 'react';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import SignIn from './components/SignIn';
import Jokes from './components/Jokes';
import SignUp from './components/SignUp';

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3300/api';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<NavLink to="/">Home</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/register">SignUp</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/signin">SignIn</NavLink>
					&nbsp;|&nbsp;
					<NavLink to="/jokes">Jokes</NavLink>
					&nbsp;|&nbsp;
					<button onClick={this.logout}>Logout</button>
				</header>
				<main>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/signin" component={SignIn} />
						<Route path="/register" component={SignUp} />
						<Route path="/jokes" component={Jokes} />
					</Switch>
				</main>
			</div>
		);
	}

	logout = e => {
		e.preventDefault();
		localStorage.removeItem('token');
		this.props.history.push('/signin');
	};
}

function Home(props) {
	return <div>Hey this is the homepage</div>;
}

export default withRouter(App);
