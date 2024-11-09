import { JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '$lib/models/user';
import { error, redirect } from '@sveltejs/kit';

const createUser = async (username: string, password: string) => {
	const user = await User.findOne({ username: username }).cache(0);

	if (user) {
		return {
			error: 'Dany użytkownik już istnieje'
		};
	}

	try {
		const user = await User.create({
			username: username,
			password: await bcrypt.hash(password, 10)
		});

		return { user };
	} catch (error) {
		return {
			error: 'Coś poszło nie tak'
		};
	}
};

const loginUser = async (username: string, password: string) => {
	const user = await User.findOne({ username: username }).cache(0);

	if (!user) {
		return {
			error: 'Niepoprawne dane logowania'
		};
	}

	const passwordIsValid = await bcrypt.compare(password, user.password);

	if (!passwordIsValid) {
		return {
			error: 'Niepoprawne dane logowania'
		};
	}

	const jwtUser = {
		id: user.id,
		username: user.username
	};

	const token = jwt.sign(jwtUser, JWT_SECRET, {
		expiresIn: '1d'
	});

	return { token };
};

const verifyToken = async (token: string) => {
	try {
		const jwtUser = jwt.verify(token, JWT_SECRET);
		if (typeof jwtUser === 'string') {
			return undefined;
		}

		const user = await User.findOne({ id: jwtUser.id }).cache(0);

		if (!user) {
			return undefined;
		}

		const sessionUser = {
			id: user._id,
			username: user.username
		};

		return sessionUser;
	} catch (error) {
		return undefined;
	}
}

const requireAuthentication = (locals: App.Locals) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
}

const requireApiAuthentication = (locals: App.Locals) => {
	if (!locals.user) {
		error(403, 'Musisz się zalogować');
	}
}

export { createUser, loginUser, verifyToken, requireAuthentication, requireApiAuthentication };