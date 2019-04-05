import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
	state = {
		username: '',
		password: ''
	};

	render() {
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="username" />
						<input
							value={this.state.username}
							onChange={this.handleInputChange}
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div>
						<label htmlFor="password" />
						<input
							value={this.state.password}
							onChange={this.handleInputChange}
							id="password"
							type="password"
							placeholder="Password"
						/>
					</div>

					<div>
						<button type="submit">Register</button>
					</div>
				</form>
			</>
		);
	}

	handleSubmit = event => {
		event.preventDefault();

		const register = {
			username: this.state.username,
			password: this.state.password
		};

		const endpoint = '/register';
		axios
			.post(endpoint, register)
			.then(res => {
				this.props.history.push('/signin');
			})
			.catch(error => {
				console.error('REGISTER ERROR', error);
			});
	};

	handleInputChange = event => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	};
}

export default withRouter(SignUp);
