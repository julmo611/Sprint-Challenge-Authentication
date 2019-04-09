import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth';

class Jokes extends React.Component {
	state = {
		joke: []
	};

	render() {
		return (
			<>
				<h2>Jokes List</h2>
				<ul>
					{this.state.joke.map(j => {
						return <div key={j.id}> == Joke: {j.joke}</div>;
					})}
				</ul>
			</>
		);
	}

	componentDidMount() {
		const endpoint = '/jokes';
		axios
			.get(endpoint)
			.then(res => {
				this.setState({ joke: res.data });
			})
			.catch(error => {
				console.error('USERS ERROR', error);
			});
	}
}

export default requiresAuth(Jokes);
