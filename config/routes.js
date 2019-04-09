const axios = require('axios');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('../auth/authenticate');

module.exports = server => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
	// implement user registration
	try {
		const { username, password } = req.body;
		if (username && password) {
			const user = req.body;
			const hash = bcrypt.hashSync(user.password, 10);
			user.password = hash;

			const newUser = await db('users').insert(user);
			res.status(201).json({ username, password: hash });
		} else {
			res.status(400).json({
				message: 'Provide username and password'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Try again'
		});
	}
}

async function login(req, res) {
	// implement user login
	try {
		const { username, password } = req.body;
		if (username && password) {
			const user = await db('users')
				.where({ username })
				.first();
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(200).json({
					message: `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: 'You shall not pass!' });
			}
		} else {
			res.status(400).json({
				message: 'Provide username and password.'
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'Try again.'
		});
	}
}

function getJokes(req, res) {
	const requestOptions = {
		headers: { accept: 'application/json' }
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then(response => {
			res.status(200).json(response.data.results);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
