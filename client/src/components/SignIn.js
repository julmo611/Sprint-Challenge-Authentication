import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignIn extends React.Component {
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
							placeholder="Your Username"
						/>
					</div>
					<div>
						<label htmlFor="password" />
						<input
							value={this.state.password}
							onChange={this.handleInputChange}
							id="password"
							type="password"
							placeholder="Your Password"
						/>
					</div>

					<div>
						<button type="submit"> == Login == </button>
					</div>
				</form>
			</>
		);
	}

	handleSubmit = event => {
		event.preventDefault();

		const endpoint = '/login';
		axios
			.post(endpoint, this.state)
			.then(res => {
				console.log('LOGIN RESPONSE', res);
				localStorage.setItem('token', res.data.token);
				this.props.history.push('/jokes');
			})
			.catch(error => {
				console.error('LOGIN ERROR', error);
			});
	};

	handleInputChange = event => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	};
}

export default withRouter(SignIn);
