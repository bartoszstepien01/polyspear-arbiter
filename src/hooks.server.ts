import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';
import { MONGO_URL } from '$env/static/private'; 
import mongoose from 'mongoose';

// These imports are needed for database initialization
import Player from '$lib/models/player';
import Match from '$lib/models/match';
import User from '$lib/models/user';
import Tournament from '$lib/models/tournament';

const handle: Handle = async ({ event, resolve }) => {
	const tokenCookie = event.cookies.get('token');
	if (tokenCookie === undefined) {
		return await resolve(event);
	}

	const sessionUser = verifyToken(tokenCookie);
	if (sessionUser !== undefined) {
		event.locals.user = sessionUser;
	}

	return await resolve(event);
};

await mongoose.connect(MONGO_URL);

export { handle };